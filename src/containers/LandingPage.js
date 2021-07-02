import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../stylesheets/LandingPage.css';

const LandingPage = () => {
  const [itemInput, setItemInput] = useState('');
  const history = useHistory();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setItemInput('')
    history.push(`/user/${itemInput}`)
  };

  return (
    <div className="App">
      <h4>Sign in with your Torre username</h4>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          className="input-username"
          placeholder="Username"
          onChange={event => setItemInput(event.target.value)}
          value={ itemInput }
          required
        />
        <button type="submit" className="btn-login">Log In</button>
      </form>
    </div>
  )
}

export default LandingPage;