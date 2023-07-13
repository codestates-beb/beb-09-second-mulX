import React, { useState, useEffect } from 'react';
import style from '../assets/css/Header.module.css'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout, setProfileImg } from '../Redux/userSlice';
import { getUserAPI } from '../apis/userfind'

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
  
  
  const dispatch = useDispatch(); // get the dispatch function
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log(useSelector((state) => state.isLoggedIn))  // Get the isLoggedIn value from the Redux store
  const userNickname = useSelector((state) => state.nickname); // Get the user's nickname from the Redux store
  const email = useSelector((state) => state.email);
  const handleLogout = () => {
    // Dispatch the setLogout action
    dispatch(setLogout());
  };

  const [user, setUser] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [DecodedImage, setDecodedImage] = useState(null);
  let decodedImages = null

  function getUser() {
    const useremail = email;
    getUserAPI(useremail, (error, responseData) => {
      if (error) {
        console.log('회원 찾기 실패');
      } else {
        //console.log('회원 정보', responseData.data.profile_img);
        setImageUrl(responseData.data.profile_img)
        console.log(imageUrl)
        dispatch(setProfileImg(imageUrl))
      }
    });
  }




  const onclickHandle = () => {
    getUser()
  }


  return (
    <div className={containerClass}>
      <Link to="/" className={style.logo}>
      </Link>
      <div className={style.menu}>
        <Link to="/post" className={style.auth_el}>
          Post
        </Link>
        <Link to="/nft" className={style.auth_el}>
          NFT
        </Link>
        <Link to="/faucet" className={style.auth_el}>
          Faucet
        </Link>
      </div>
      <div className={style.auth}>
        {!isLoggedIn && (
          <>
            <Link to="/login" className={style.auth_el}>
              Login
            </Link>
            <Link to="/signup" className={style.auth_el}>
              Signup
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/mypage" className={style.auth_el}>
              <div onClick={onclickHandle}>{userNickname}</div>
            </Link>
            {/* <button onClick={onclickHandle}>{userNickname}</button> */}
            {/* <img src={imageUrl} /> */}
            <Link to="" className={style.auth_el} onClick={handleLogout}>Logout</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header