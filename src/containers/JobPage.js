import { useEffect, useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getJobDetails, getEmployees } from '../utils/request'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import '../stylesheets/JobPage.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #cddc39;
`;


const JobPage = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null)
  const [employees, setEmployees] = useState(null)
  const [jobDetailsError, setJobDetailsError] = useState(null);
  const [employeeError, setEmployeeError] = useState(null);
  
  const history = useHistory();
  
  const fetchEmployees = useCallback(async (companyName) => {
    try {
      const employees = await getEmployees(companyName);
      console.log(employees);
      setEmployees(employees.results);
    } catch (error) {
      setEmployeeError(true)
    }
  }, [])

  const fetchJob = useCallback(async () => {
    try {
      const job = await getJobDetails(jobId);
      const companyName = job?.organizations?.[0].name
      setJobDetails(job);
      fetchEmployees(companyName);
    } catch (error) {
      setJobDetailsError(true)
    }
  }, [jobId, fetchEmployees])

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
        { (!jobDetails && !jobDetailsError) && <ClipLoader loading = { !jobDetails && !jobDetailsError } css = { override } size = { 150 }/> }
        { jobDetailsError && <h1>There was an error retrieving job details.</h1> }
        { jobDetails && 
          <>
            <div>
              <img src={ image } alt="companyProfilePicture" className="image" />
              <h5>{ headline }</h5>
            </div>
            <div><span>{ type }</span></div>
            <div><span className="company-name">Organization(s) name(s):</span><br />{ companyName }</div>
            <div>
              <span className="salary">Monetary compensation:</span><br />
              <span>{ currency } { minValue }-{ maxValue }/{ unitText }</span>
            </div>
            <br />
            <br />
            <button onClick={() => history.goBack()}>Go Back</button>
          </>
        }
      </div>

      <div className="employee-cards">
        { (!employees && !employeeError) && <ClipLoader loading = { !employees } css = { override } size = { 150 } /> }
        { employeeError && <h1>There was an error retrieving team members, member not added to company profile</h1> }
        { employees?.map(e => (
        <div key={ e } className="employee-card">
          <span className="work">Team member</span>
          <div>
            <img src={ e.picture } alt="employeeProfilePicture" className="em-image" />
          </div>
          <div className="name-job"><span>{ e.name }</span></div>
          <div className="headline-job"><span>{ e.professionalHeadline }</span></div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default JobPage;