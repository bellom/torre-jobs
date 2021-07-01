import { useEffect, useCallback, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { getUser, getRelevantJobs } from '../utils/request';
import '../stylesheets/HomePage.css';

const HomePage = () => {
  const { username = '' } = useParams();
  const [user, setUser] = useState({});
  const [jobs, setJobs] = useState([]);

  const fetchUser = useCallback(async () => {
    const userDetails = await getUser(username)
    setUser(userDetails);
  }, [username])

  const fetchJobs = useCallback(async () => {
    const jobs = await getRelevantJobs(username);
    setJobs(jobs.results);
  }, [username])

  useEffect(() => {
    fetchUser()
    fetchJobs()
  }, [fetchUser, fetchJobs])

  const image = user?.person?.picture
  const headline = user?.person?.professionalHeadline
  const name = user?.person?.name
  const country = user?.person?.location?.country

  return (
    <div className="container">
      <div className="titles">
        <span>Profile</span>
        <span className="span">List of jobs relevant to your profile</span>
      </div>
      <div className="cards">
        {/* <div className="user-cards">
          <div className="img-wrapper user-img">
            <img src={image} alt="" class='image' />
          </div>
          <div className='user-info'>
            <div className="headline">{headline}</div>
            <div className="name">{name}</div>
            <div className="country">{country}</div>
          </div>
        </div> */}

        <div className="job-cards">
          {jobs.map(e => (
              <div key={e.id} className="job-card">
                <Link to={`/job/${e.id}`}>
                  <div>
                    <span>Job Title:</span>
                    <span>{e.objective}</span>
                  </div>
                  <div>
                    <span>Job Type:</span>
                    <span>{e.type}</span>
                  </div>
                  <div>
                    <span>Company Name:</span>
                    <span>{e.organizations[0].name}</span>
                  </div>
                </Link>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage