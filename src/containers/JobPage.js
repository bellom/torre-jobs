import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobDetails, getEmployees } from '../utils/request'

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


  return (
    <>
      <h1>Job Details</h1>
      {JSON.stringify(jobDetails, null, 2)}
      <h1>List of Company Employees at the job</h1>
      <ul>
        {employees.map(e => (<li key={e}>
          {JSON.stringify(e, null, 2)};
        </li>))}
      </ul>
    </>
  )
}

export default JobPage;