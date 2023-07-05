import React from 'react'
import style from '../assets/css/Header.module.css'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={style.headerContainer}>
        <Link to="/" className={style.logo}>logo</Link>
        <div className={style.menu}>
            <div>Post</div>
            <div>NFT</div>
            <div>Faucet</div>
        </div>
        <div className={style.auth}>
          <Link to="/login" className={style.auth_el}>Login</Link>
          <Link to="/join" className={style.auth_el}>join</Link>
        </div>
    </div>
  )
}

export default Header