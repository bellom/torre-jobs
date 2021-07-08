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
      setEmployees(employees);
      console.log(employees)
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

  const image = jobDetails?.picture;
  const headline = jobDetails?.title;
  const type = jobDetails?.type;
  const companyName = jobDetails?.name;
  const currency = jobDetails?.currency;
  const minValue = jobDetails?.minValue
  const maxValue = jobDetails?.maxValue;
  const formattedType = jobDetails?.formattedType
  const time = jobDetails?.deadline
  return (
    <div className="job-page">
      <div className="job-details">
        { (!jobDetails && !jobDetailsError) && <ClipLoader loading = { !jobDetails && !jobDetailsError } css = { override } size = { 100 }/> }
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
              <span>{ currency } { minValue }-{ maxValue }/{ formattedType }</span>
            </div>
            <div>
              <span className="salary">Application Deadline:</span><br />
              <span>{ time }</span>
            </div>
            <br />
            <br />
            <button onClick={() => history.goBack()}>Go Back</button>
          </>
        }
      </div>

      <div className="employee-cards">
        { (!employees && !employeeError) && <ClipLoader loading = { !employees } css = { override } size = { 100 } /> }
        { (employees && !employees.length) && <span className="no-employee">There is no employee registered with this company</span> }
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