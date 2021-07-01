import { Link } from 'react-router-dom';
import { useState } from 'react'



const Header = () => {
  const [user] = useState([]);

  return (
    <div className="header">
      <Link to={`/user/${user}`}>My Profile</Link>
    </div>
  )
}

export default Header