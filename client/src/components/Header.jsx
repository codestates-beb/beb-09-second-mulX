import React, { useState, useEffect } from 'react';
import style from '../assets/css/Header.module.css'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../Redux/userSlice';

const Header = ( {path} ) => {
  //헤더 화면
  let containerClass;

  if (path === 'orange') {
    containerClass = style.headerContainer;
  } else if (path === 'white') {
    containerClass = style.headerContainer_white;
  } else if (path === 'black') {
    containerClass = style.headerContainer_black;
  }

  //@notion 리덕스 storge에 있는 유저정보 불러온다.
  const user = useSelector((state) => state.user); 

  // const [isLogin, setIsLogin] = useState(false)
  // useEffect(() => {
  //   if(!!user.email){
  //     setIsLogin(false)
  //   }else{
  //     setIsLogin(true)
  //   }
  // },[isLogin])
  // console.log(isLogin)
  


  const dispatch = useDispatch(); // get the dispatch function
  const handleLogout = () => {
    // Dispatch the setLogout action
    dispatch(setLogout());
  };

  return (
    <div className={containerClass}>
        <Link to="/" className={style.logo}>logo</Link>
        <div className={style.menu}>
            <Link to="/post" className={style.auth_el}>Post</Link>
            <div className={style.auth_el}>NFT</div>
            <div className={style.auth_el}>Faucet</div>
        </div>
        <div className={style.auth}>
          <Link to="/login" className={style.auth_el}>Login</Link>
          <Link to="/signup" className={style.auth_el}>Signup</Link>
          <button className={style.auth_el} onClick={handleLogout}>Logout</button> {/* Add onClick handler */}
        </div>
    </div>
  )
}

export default Header