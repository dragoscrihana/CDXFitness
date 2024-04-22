import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';
import Login from '../Login/Login';
import Plans from '../Plans/Plans';
import Programs from '../Programs/Programs';
import Reasons from '../Reasons/Reasons';

const MainPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleCloseButtonClick = () => {
    setShowLoginForm(false);
  };

  return (
    <div className="App">
      <div className={showLoginForm ? 'bg-blur' : ''}>
        <Hero onLoginClick={handleLoginButtonClick} />
        <Programs />
        <Reasons />
        <Plans />
        <Footer />
      </div>
      {showLoginForm && <Login onCloseClick={handleCloseButtonClick} state={"signup"} />}
    </div>
  )
}

export default MainPage
