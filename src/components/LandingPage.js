import React, { useState } from 'react';
import '../stylesheets/LandingPage.css';

const  LandingPage = () => {
  const [itemInput, setItemInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setItemInput(itemInput)
    this.props.history.push('/homepage')
  };

  console.log(itemInput)
  return (
    <div className="App">
      <h3>Sign in with your Torre username</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          className="input-username"
          placeholder="Username"
          onChange={event => setItemInput(event.target.value)}
          value={itemInput}
        />
        <button type="submit" className="btn-login">Log In</button>
      </form>
    </div>
    )
}

export default LandingPage;