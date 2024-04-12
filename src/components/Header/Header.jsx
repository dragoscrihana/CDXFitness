import React, { useState, useEffect } from 'react'
import './Header.css'
import Logo from '../../assets/112.png'
import Bars from '../../assets/bars.png'
import { Link } from 'react-scroll'
import { NavLink } from 'react-router-dom';

const Header = () => {

  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
      // Close the menu when resizing to full screen
      if (!mobile && menuOpened) {
        setMenuOpened(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpened, mobile]);

  return (
    <div className="header">
      <img src={Logo} alt="" className='logo'></img>
      {menuOpened === false && mobile === true ? (
        <div className='bars-div' onClick={()=>setMenuOpened(true)}>
          <img src={Bars} alt="" className='bars'/>
        </div>
      ) : (
        <ul className='header-menu'>
          <li>
            <Link 
              onClick={()=>setMenuOpened(false)}
              to='home'
              spy={true}
              smooth={true}
            >Home
            </Link>
          </li>

          <li>
            <NavLink 
            to={'/exercises'}
            className={"nav"}>
            Exercises
            </NavLink>
          </li>

          <li>
            <Link 
              onClick={()=>setMenuOpened(false)}
              to='programs-header'
              spy={true}
              smooth={true}
            >Programs
            </Link>
          </li>

          <li>
            <Link 
              onClick={()=>setMenuOpened(false)}
              to='reasons'
              spy={true}
              smooth={true}
            >Reasons
            </Link>
          </li>

          <li>
            <Link 
              onClick={()=>setMenuOpened(false)}
              to='planuri'
              spy={true}
              smooth={true}
            >Plans
            </Link>
          </li>

        </ul>
      )}
      
    </div>
  )
}

export default Header
