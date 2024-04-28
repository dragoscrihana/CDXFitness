import React, { useState, useEffect } from 'react'
import './Header.css'
import Logo from '../../assets/112.png'
import Bars from '../../assets/bars.png'
import { Link } from 'react-scroll'
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {

  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  const [menuOpened, setMenuOpened] = useState(false);

  const notify_error = (message) => {
    console.log("failure");
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleNavLinkClick = (event) => {
    const authToken = localStorage.getItem("auth-token");
    if (!authToken) {
      event.preventDefault();
      notify_error("Please log in first!");
    } else {
      setMenuOpened(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
      if (!mobile && menuOpened) {
        setMenuOpened(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpened, mobile]);

  return (
    <div className="header">
      <img src={Logo} alt="" className='logo'></img>
      {menuOpened === false && mobile === true ? (
        <div className='bars-div' onClick={() => setMenuOpened(true)}>
          <img src={Bars} alt="" className='bars' />
        </div>
      ) : (
        <ul className='header-menu'>
          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to='home'
              spy={true}
              smooth={true}
            >Home
            </Link>
          </li>

          <li>
            <NavLink
              to='/exercises'
              className="nav"
              onClick={(e) => handleNavLinkClick(e)}
            >
              Exercises
            </NavLink>

          </li>

          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to='programs-header'
              spy={true}
              smooth={true}
            >Programs
            </Link>
          </li>

          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to='reasons'
              spy={true}
              smooth={true}
            >Reasons
            </Link>
          </li>

          <li>
            <Link
              onClick={() => setMenuOpened(false)}
              to='planuri'
              spy={true}
              smooth={true}
            >Plans
            </Link>
          </li>

        </ul>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </div>
  )
}

export default Header
