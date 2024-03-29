import './App.css';
import React, { useState } from 'react';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Login from './components/Login/Login';
import Plans from './components/Plans/Plans';
import Programs from './components/Programs/Programs';
import Reasons from './components/Reasons/Reasons';
function App() {
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
      {showLoginForm && <Login onCloseClick={handleCloseButtonClick} />}
    </div>
  );
}

export default App;
