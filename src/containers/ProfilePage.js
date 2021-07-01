import { useEffect, useCallback, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { getUser } from '../utils/request';

const ProfilePage = () => {
  const { username = '' } = useParams();
  const [user, setUser] = useState({});

  const fetchUser = useCallback(async () => {
    const userDetails = await getUser(username)
    setUser(userDetails);
  }, [username])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <>
      <nav >
        <Link to="/homepage">Home</Link>
      </nav>
      <h2>Profile</h2>
      {JSON.stringify(user, null, 2)}
    </>
  )

}

export default ProfilePage;