import React, { useState, useRef } from 'react';
import "../../assets/css/mypage.css";
import styles from '../../assets/css/MainTitle.module.css';
import PostImg from '../post/PostImg'

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg'
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg'
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg'

const MyPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundPicture, setBackgroundPicture] = useState(null);
  const [nickname, setNickname] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenCount, setTokenCount] = useState(0);
  const fileInputRef = useRef(null);

  const InfoArr = [[dumyImg1,"Blue sky and green mountains", "gokite227", "2023.07.06"],
                    [dumyImg2, "River and mountain with clear water", "sjlee80", " 2023.07.05"],
                    [dumyImg3, "There is a mountain at the end of the trail", "stcr96", "2023.07.04"],
                    [dumyImg4, "Snowy mountain wonders", "codex1928", "2023.07.03"]]

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleBackgroundPictureChange = (e) => {
    const file = e.target.files[0];
    setBackgroundPicture(file);
  };

  // const handleProfilePictureClick = () => {
  //   fileInputRef.current.click();
  // };

  const handleBackgroundPictureClick = (e) => {
    fileInputRef.current.click();
  };

  return (
    <div className="mypage-container">
      <div className="picture-section">
        <div className="background-picture">
          <div className="form-field">
            <button type="button" onClick={handleBackgroundPictureClick}>프로필 배경사진 추가하기</button>
            <input
              type="file"
              id="mypage-backgroundPicture"
              accept="image/*"
              onChange={handleBackgroundPictureChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="profile-picture">
          {profilePicture ? (
            <img src={URL.createObjectURL(profilePicture)} alt="프로필 사진" />
          ) : (
            <div className="default-profile-picture">프로필 사진 추가하기</div>
          )}
          <input
            type="file"
            id="mypage-profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <div className="profile-details">
        <h2>{nickname}</h2>
        <div className="address-details">
          <div className="profile-wallet">
            <p>지갑 주소: {walletAddress}</p>
          </div>
          <div className="profile-token-count">
            <p>토큰 개수: {tokenCount}</p>
          </div>
        </div>
      </div>
      <div className="my-posts-section">
        <h2>나의 게시물</h2>
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
        <h2>나의 NFT</h2>
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
