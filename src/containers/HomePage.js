import { useEffect, useCallback, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { getUser, getRelevantJobs } from '../utils/request';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import '../stylesheets/HomePage.css';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: #cddc39;
`;

const HomePage = () => {
  const { username = '' } = useParams();
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [userError, setUserError] = useState(null);
  const [jobsError, setJobsError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const userDetails = await getUser(username)
      setUser(userDetails)
    } catch (error) {
      setUserError(true)
      console.log("working!!")
    }
  }, [username])

  const fetchJobs = useCallback(async () => {
    try {
      const jobs = await getRelevantJobs(username);
      setJobs(jobs.results);
    } catch (error) {
      setJobsError(true)
      console.log("working!!")
    }
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
        <div className="user-cards">
          { !user && !userError && <ClipLoader loading={!user && !userError} css={override} size={150}/> }
          { userError && <h1>There was an error retrieving user profile.</h1> }
          { user && <><div className="img-wrapper user-img">
            <img src={image} alt="" className='image' />
          </div>
          <div className='user-info'>
            <div className="headline">{headline}</div>
            <div className="name">{name}</div>
            <div className="country">{country}</div>
          </div></>}
        </div>

        <div className="job-cards">
          { !jobs && <ClipLoader loading={!jobs} css={override} size={150}/> }
          { jobsError && <h1>There was an error retrieving job list.</h1> }
          { jobs?.map(e => (
              <div key={e.id} className="job-card">
                <Link to={`/job/${e.id}`}>
                  <div>
                    <span>{e.objective}</span>
                  </div>
                  <div className="type">
                    <span>{e.type}</span>
                  </div>
                  <div>
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