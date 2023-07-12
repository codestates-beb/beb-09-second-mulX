import React, { useState } from 'react';
import '../../assets/css/mintnft.css';

const MintNFT = () => {
  const [mintNftPicture, setMintNftPicture] = useState('');
  const [mintNftName, setMintNftName] = useState('');
  const [mintNftInfo, setMintNftInfo] = useState('');
  const [mintNftPrice, setMintNftPrice] = useState('');
  const [mintNftTheme, setMintNftTheme] = useState('');

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setMintNftPicture(URL.createObjectURL(file));
  };

  const handleNameChange = (e) => {
    setMintNftName(e.target.value);
  };

  const handleInfoChange = (e) => {
    setMintNftInfo(e.target.value);
  };

  const handlePriceChange = (e) => {
    setMintNftPrice(e.target.value);
  };

  const handleThemeChange = (e) => {
    setMintNftTheme(e.target.value);
  };

  const handleMintNFT = (e) => {
    e.preventDefault();
    // NFT 민팅 처리 로직 작성
    console.log('NFT 정보:', mintNftPicture, mintNftName, mintNftInfo, mintNftPrice, mintNftTheme);
    // 필요한 API 호출 등을 수행할 수 있습니다.
  };

  return (
    <div className="mint-nft-container">
      <h1>Mint NFT</h1>
      <form onSubmit={handleMintNFT} className="mint-nft-form">
        <label htmlFor="input-nft-picture" className="mint-nft-picture">
          {mintNftPicture && <img src={mintNftPicture} alt="Preview" className="preview-image" />}
          <input
            type="file"
            id="input-nft-picture"
            accept="image/*"
            onChange={handlePictureChange}
            required
          />
        </label>
        <div className="mint-nft-detail">
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={mintNftName}
            onChange={handleNameChange}
            required
          />
          <label htmlFor="info">정보:</label>
          <textarea
            id="info"
            value={mintNftInfo}
            onChange={handleInfoChange}
            required
          ></textarea>
          <label htmlFor="price">가격:</label>
          <input
            type="text"
            id="price"
            value={mintNftPrice}
            onChange={handlePriceChange}
            required
          />
          <label htmlFor="theme">테마:</label>
          <input
            type="text"
            id="theme"
            value={mintNftTheme}
            onChange={handleThemeChange}
            required
          />
        </div>
        <button type="submit">NFT 민팅</button>
      </form>
    </div>
  );
};

export default MintNFT;
