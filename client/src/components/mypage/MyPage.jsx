import React, { useState } from 'react';
import "../../assets/css/mypage.css";

const MyPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundPicture, setBackgroundPicture] = useState(null);
  const [nickname, setNickname] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenCount, setTokenCount] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleBackgroundPictureChange = (e) => {
    const file = e.target.files[0];
    setBackgroundPicture(file);
  };

  return (
    <div className="mypage-container">
      <div className="picture-section">
        <div className="background-picture">
          <img src={backgroundPicture} alt="Background" />
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundPictureChange}
          />
        </div>
        <div className="profile-picture">
          <img src={profilePicture} alt="Profile" />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
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
      <div className="myposts-section">
        <h2>나의 게시물</h2>
        {/* 게시물 목록을 표시하는 컴포넌트나 로직을 추가하세요 */}
      </div>
      <div className="mynfts-section">
        <h2>나의 NFT</h2>
        {/* NFT 목록을 표시하는 컴포넌트나 로직을 추가하세요 */}
      </div>
    </div>
  );
}

export default MyPage;
