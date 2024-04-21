import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/112.png';
import nav_dropdown from '../../assets/nav_dropdown.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [menu, setMenu] = useState("exercises");
    const menuRef = useRef();
    const location = useLocation();

    useEffect(() => {
        // Extract the pathname from the location and set the menu accordingly
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

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div>
            <div className='navbar'>
                <Link to='/' onClick={() => { setMenu("home") }} className="nav-logo">
                    <img src={logo} alt="" />
                </Link>
                <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
                <ul ref={menuRef} className="nav-menu">
                    <li><Link to='/' className='link-navbar'>Home</Link>{menu === "home" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("exercises") }}><Link to='/exercises' className='link-navbar'>Exercises</Link>{menu === "exercises" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("chest") }}><Link to='/chest' className='link-navbar'>Chest</Link>{menu === "chest" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("back") }}><Link to="/back" className='link-navbar'>Back</Link>{menu === "back" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("biceps") }}><Link to='/biceps' className='link-navbar'>Biceps</Link>{menu === "biceps" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("triceps") }}><Link to="/triceps" className='link-navbar'>Triceps</Link>{menu === "triceps" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("legs") }}><Link to='/legs' className='link-navbar'>Legs</Link>{menu === "legs" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("shoulders") }}><Link to="/shoulders" className='link-navbar'>Shoulders</Link>{menu === "shoulders" ? <hr /> : <></>}</li>
                </ul>

                <div className="blur blur-n-1"></div>
                <div className="blur blur-n-2"></div>
            </div>

        </div>

    )

}

export default Navbar;
