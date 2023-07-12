import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../../assets/css/mypage.css";
import styles from '../../assets/css/MainTitle.module.css';
import PostImg from '../post/PostImg'

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg'
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg'
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg'

const MyPage = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const userNickname = useSelector((state) => state.nickname);
  const profileImg = useSelector((state) => state.profileImg);
  const walletAddress = useSelector((state) => state.address);
  const tokenCount = useSelector((state) => state.token_amount);
  const ethCount = useSelector((state) => state.eth_amount);

  const InfoArr = [[dumyImg1,"Blue sky and green mountains", "gokite227", "2023.07.06"],
                    [dumyImg2, "River and mountain with clear water", "sjlee80", " 2023.07.05"],
                    [dumyImg3, "There is a mountain at the end of the trail", "stcr96", "2023.07.04"],
                    [dumyImg4, "Snowy mountain wonders", "codex1928", "2023.07.03"]]


  return (
    <div className="mypage-container">
      <div className="picture-section">
        <div className="profile-picture">
            <img src={profileImg} alt="프로필 사진" />
        </div>
        <div className="profile-details">
          <h2>{userNickname}</h2>
          <div className="address-details">
            <div className="profile-wallet">
              <p>walletAddress: {walletAddress}</p>
            </div>
            <div className="profile-token-count">
              <span>토큰 개수: {tokenCount}</span>
              <span>Eth : {ethCount}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="my-posts-section">
        <h2>my Post</h2>
        <div className={styles.Postimg}>
          {
            InfoArr.map((info, i) => {
              return(
                <PostImg PostInfo={info} key={i}/>
              )
            })
          }
        </div>
      </div>
      <div className="my-nfts-section">
        <h2>my NFT</h2>
        <div className={styles.NFTimg}>
          <img src={dumyImg1} alt="mypost-1"></img>
          <img src={dumyImg2} alt="mypost-2"></img>
          <img src={dumyImg3} alt="mypost-3"></img>
          <img src={dumyImg4} alt="mypost-4"></img>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
