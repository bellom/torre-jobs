import { useEffect, useCallback, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { getUser, getRelevantJobs } from '../utils/request';
// import Header from '../components/Header'
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

  console.log({user})
  console.log({jobs})
  // For user details::::::::
  // Profile Picture - res.person.picture
  // Headline - res.person.professionalHeadline
  // Name - res.person.name
  // country - res.person.location.country

  // For job list:::::::::
  // Job title - jobs.objective
  // Job type - jobs.type
  // company name- job.organizations.name


  return (
    // <div className="homepage">
    //   {/* <Header /> */}
    //   <div className="user-grid">
    //     <h2>User Details</h2>
    //       {JSON.stringify(user, null, 2)}
    //   </div>
    //   <div>
    //     <h2>List of jobs relevant to your profile</h2>
    //     <ul>
    //       {jobs.map(e => (
    //         <li key={e.id}>
    //           <Link to={`/job/${e.id}`}>
    //             {JSON.stringify(e, null, 2)}
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>

    <div class="container">
      <div class="user-cards">
      <h2>User Details</h2>
        <div class="img-wrapper">
          <img src="https://maddieshome.files.wordpress.com/2018/11/wall-art-2852231_960_720.jpg" alt="" class='image' />
        </div>
        <div class='user-info'>
          <div class="headline">Headline</div>
          <div className="name">Name</div>
          <div className="country">Country</div>
        </div>
      </div>

      <div class="job-cards">
      </div>
    </div>
  )
}

export default HomePage