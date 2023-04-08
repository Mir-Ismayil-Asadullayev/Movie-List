import React from 'react';
import logo from '../assets/images/logo.jpg';
import logo2 from '../assets/images/base.png';
import header from '../assets/styles/components/Header.module.css';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className={header.header}>
            <img className={header.img} src={logo} alt="logo" />
            <Link to='/'> <button className={header.button}>Home</button></Link>
            <Link to='/list'><button className={header.button}>List</button></Link>
            <img className={header.img} src={logo2} alt="logo2" />
        </header>
    )
}
