import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from '../assets/images/logo.jpg';
import logo2 from '../assets/images/base.png';
import header from '../assets/styles/components/Header.module.css';
import { Link } from 'react-router-dom';
import { Context } from '../context';


export const Header = () => {
    const { href } = useContext(Context);
    const [src, setSrc] = useState('');
    const home = useRef();
    const list = useRef();

    useEffect(() => { setSrc(href); }, [href]);

    const click = (e) => {
        let arr = [home.current, list.current];
        arr.forEach(item => {
            if (item.innerText === e.target.innerText)
                item.classList.add(header.selected);
            else
                item.classList.remove(header.selected);
        })
    }

    return (
        <header className={header.header}>
            <Link to='/'>
                <img
                    className={header.img}
                    src={logo}
                    alt="logo"
                />
            </Link>
            <Link to='/'>
                <button
                    ref={home}
                    className={src === 'http://localhost:3000/' ? header.selected : ''}
                    onClick={click}
                >
                    Home
                </button>
            </Link>
            <Link to='/list'>
                <button
                    ref={list}
                    className={
                        (src === 'http://localhost:3000/list' || src === 'http://localhost:3000/list/')
                            ?
                            header.selected
                            :
                            ''
                    }
                    onClick={click}
                >
                    Lists
                </button>
            </Link>
            <Link to='/list'>
                <img
                    className={header.img}
                    src={logo2}
                    alt="logo2"
                />
            </Link>
        </header>
    )
}
