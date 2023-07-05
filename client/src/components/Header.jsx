import React from 'react'
import style from '../assets/css/Header.module.css'

const Header = () => {
  return (
    <div className={style.headerContainer}>
        <div className={style.logo}>logo</div>
        <div className={style.menu}>
            <div>Post</div>
            <div>NFT</div>
            <div>Faucet</div>
        </div>
        <div className={style.auth}>
            <div>Login</div>
            <div>Join</div>
        </div>
    </div>
  )
}

export default Header