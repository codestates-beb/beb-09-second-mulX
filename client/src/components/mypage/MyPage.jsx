import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../../assets/css/mypage.css";
import styles from '../../assets/css/MainTitle.module.css';
import PostImg from '../post/PostImg'

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg'
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg'
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg'
import NftImg from '../nft/NftImg';

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
                    [dumyImg4, "Snowy mountain wonders", "codex1928", "2023.07.03"],
                    [dumyImg1,"Blue sky and green mountains", "gokite227", "2023.07.06"],
                    [dumyImg2, "River and mountain with clear water", "sjlee80", " 2023.07.05"]]


  return (
    <div className="mypage-container">
      <div className="picture-section">
        <div className="profile-picture">
            <img src={profileImg} alt="프로필 사진" />
        </div>
      </div>
      <div className="profile-section">
        <div className="profile-details">
          <h2 className="profile-Nicname">{userNickname}</h2>
          <div className="address-details">
            <div className="profile-wallet">
              <div>walletAddress: {walletAddress}</div>
              <div>토큰 개수: {tokenCount}</div>
              <div>Eth : {ethCount}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="my-posts-section">
        <h2>my Post</h2>
        <div className="imgGrid">
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
        <div className="imgGrid">
        {
            InfoArr.map((info, i) => {
              return(
                <NftImg PostInfo={info} key={i}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default MyPage;
