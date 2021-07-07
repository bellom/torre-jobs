import { useEffect, useCallback, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom';
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

  const history = useHistory();

  const fetchUser = useCallback(async () => {
    try {
      const userDetails = await getUser(username)
      setUser(userDetails)
    } catch (error) {
      setUserError(true)
    }
  }, [username])

  const fetchJobs = useCallback(async () => {
    try {
      const jobs = await getRelevantJobs(username);
      setJobs(jobs);
      console.log(jobs)
    } catch (error) {
      setJobsError(true)
    }
  }, [username])


  useEffect(() => {
    fetchUser()
    fetchJobs()
  }, [fetchUser, fetchJobs])


  const image = user?.picture
  const headline = user?.professionalHeadline
  const name = user?.name
  const country = user?.country

  return (
    <div className="container">
      <div className="titles">
        <span>Profile</span>
        <span className="span">List of jobs relevant to your profile</span>
      </div>
      <div className="cards">
        <div className="user-cards">
          { (!user && !userError) && <ClipLoader loading = { !user && !userError } css = {  override } size = { 100 } /> }
          { userError && <h1>There was an error retrieving user profile.</h1> }
          { user && 
            <>
              <div className="img-wrapper user-img">
                <img src={ image } alt="profilePicture" className="image" />
              </div>
              <div className="user-info">
                <div className="headline">{ headline }</div>
                <div className="name">{ name }</div>
                <div className="country">{ country }</div>
              </div>
              <br />
              <br />
              <button onClick={() => history.goBack()}>Logout</button>
            </>
          }
        </div>

        <div className="job-cards">
          { (!jobs && !jobsError) && <ClipLoader loading = { !jobs && !jobsError } css = { override } size = { 100 } /> }
          { jobsError && 
            <h1>
              Oops! there was an error retrieving job list due to user not found.
              <br />
              <br />
              <Link to="/" className="link-login">Login with another username</Link>
            </h1> }
          { jobs?.map(e => (
            <div key={ e.id } className="job-card">
              <Link to={ `/job/${e.id}` }>
                <div>
                  <span>{ e.objective }</span>
                </div>
                <div className="type">
                  <span>{ e.type }</span>
                </div>
                <div>
                  <span>{ e.organizationName }</span>
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