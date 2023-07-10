import React, { useState } from 'react';
import "../../assets/css/mypage.css";

const MyPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundPicture, setBackgroundPicture] = useState(null);
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

  // 더 많은 로직과 함수가 있다고 가정합니다.

  return (
    <div className="mypage-container">
      <div className="profile-section">
        <div className="profile-picture">
          <img src={profilePicture} alt="Profile" />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>
        <div className="background-picture">
          <img src={backgroundPicture} alt="Background" />
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundPictureChange}
          />
        </div>
      </div>
      <div className="my-posts-section">
        <h2>나의 게시물</h2>
        {/* 게시물 목록을 표시하는 컴포넌트나 로직을 추가하세요 */}
      </div>
      <div className="my-nfts-section">
        <h2>나의 NFT</h2>
        {/* NFT 목록을 표시하는 컴포넌트나 로직을 추가하세요 */}
      </div>
    </div>
  );
}

export default MyPage;
