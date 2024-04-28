import React, { useState, useEffect } from 'react'
import '../Header/Header.css'
import './Navbar.css'
import Logo from '../../assets/112.png'
import Bars from '../../assets/bars.png'
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

    const [menu, setMenu] = useState("exercises");
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        switch (pathname) {
            case '/':
                setMenu("home");
                break;
            case '/exercises':
                setMenu("exercises");
                break;
            case '/chest':
                setMenu("chest");
                break;
            case '/back':
                setMenu("back");
                break;
            case '/biceps':
                setMenu("biceps");
                break;
            case '/triceps':
                setMenu("triceps");
                break;
            case '/legs':
                setMenu("legs");
                break;
            case '/shoulders':
                setMenu("shoulders");
                break;
            default:
                setMenu("exercises");
                break;
        }
    }, [location]);

    const [mobile, setMobile] = useState(window.innerWidth <= 768);
    const [menuOpened, setMenuOpened] = useState(false);

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
            <Link to='/' onClick={() => { setMenu("home") }}>
                <img src={Logo} alt="" className='logo'></img>
            </Link>
            {menuOpened === false && mobile === true ? (
                <div className='bars-div' onClick={() => setMenuOpened(true)}>
                    <img src={Bars} alt="" className='bars' />
                </div>
            ) : (
                <ul className='navbar-menu'>
                    <li><Link to='/' className='link-navbar'>Home</Link>{menu === "home" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("exercises"); setMenuOpened(false) }}><Link to='/exercises' className='link-navbar'>Exercises</Link>{menu === "exercises" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("chest"); setMenuOpened(false) }}><Link to='/chest' className='link-navbar'>Chest</Link>{menu === "chest" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("back"); setMenuOpened(false) }}><Link to="/back" className='link-navbar'>Back</Link>{menu === "back" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("biceps"); setMenuOpened(false) }}><Link to='/biceps' className='link-navbar'>Biceps</Link>{menu === "biceps" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("triceps"); setMenuOpened(false) }}><Link to="/triceps" className='link-navbar'>Triceps</Link>{menu === "triceps" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("legs"); setMenuOpened(false) }}><Link to='/legs' className='link-navbar'>Legs</Link>{menu === "legs" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("shoulders"); setMenuOpened(false) }}><Link to="/shoulders" className='link-navbar'>Shoulders</Link>{menu === "shoulders" ? <hr /> : <></>}</li>
                </ul>
            )}
            <div className="blur blur-n-1"></div>
            <div className="blur blur-n-2"></div>
        </div>
    )
}

export default Navbar
