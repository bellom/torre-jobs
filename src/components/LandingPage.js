import '../stylesheets/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="App">
      <input 
        className="input-username"
        placeholder="Username"
        type="name"
      />
      <button className="btn-login">Log In</button>
    </div>
  );
}

export default LandingPage;
