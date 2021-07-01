import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobDetails, getEmployees } from '../utils/request'
import '../stylesheets/JobPage.css';

const JobPage = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState({})
  const [employees, setEmployees] = useState([])

  const fetchJob = useCallback(async () => {
    const job = await getJobDetails(jobId);
    const companyName = job?.organizations?.[0].name
    console.log(job);
    setJobDetails(job);
    fetchEmployees(companyName);
  }, [jobId])

  const fetchEmployees = useCallback(async (companyName) => {
    const employees = await getEmployees(companyName);
    console.log(employees);
    setEmployees(employees.results);
  }, [])

  useEffect(() => {
    fetchJob()
  }, [fetchJob])

  const image = jobDetails?.organizations?.[0].picture
  const headline = jobDetails?.serpTags?.title
  const type = jobDetails?.serpTags?.employmentType?.[0]
  const companyName = jobDetails?.organizations?.[0].name
  const currency = jobDetails?.serpTags?.baseSalary?.currency
  const minValue = jobDetails?.serpTags?.baseSalary?.value.minValue
  const maxValue = jobDetails?.serpTags?.baseSalary?.value.maxValue
  const unitText = jobDetails?.serpTags?.baseSalary?.value.unitText.toLowerCase()

  return (
    <div className="job-page">
      <div className="job-details">
        <div>
          <img src={image} alt="" className="image" />
          <h5>{headline}</h5>
        </div>
        <div><span>{type}</span></div>
        <div><span className="company-name">Organization(s) name(s):</span><br />{companyName}</div>
        <div>
          <span className="salary">Monetary compensation:</span><br />
          <span>{currency} {minValue}-{maxValue}/{unitText}</span>
        </div>
      </div>

      <div className="employee-cards">
        {employees.map(e => (
        <div key={e} className="employee-card">
          <span className="work">Team member</span>
          <div className="img-wrapper">
            <img src={e.picture} alt="" className="em-image" />
          </div>
          <div className="name-job"><span>{e.name}</span></div>
          <div className="headline-job"><span>{e.professionalHeadline}</span></div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default JobPage;