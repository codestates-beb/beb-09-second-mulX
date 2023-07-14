import React, { useState } from 'react';
import '../../assets/css/mintnft.css';
import { mintNftAPI } from '../../apis/mintNft.js';
import { useSelector } from 'react-redux';

const MintNFT = () => {
  const [mintNftPicture, setMintNftPicture] = useState('');
  const [PictureUrl, setPictureUrl] = useState('');
  const [mintNftName, setMintNftName] = useState('');
  const [mintNftInfo, setMintNftInfo] = useState('');
  const [mintNftPrice, setMintNftPrice] = useState('');
  const [mintNftTheme, setMintNftTheme] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal Open handling
  const [message, setMessage] = useState(''); // Modal Message
  const [checkFile, setCheckFile] = useState(0); // 비디오(1)인지 이미지(0)인지 체크
  const [nftItem, setNftItem] = useState(null);
  const [nftItemUrl, setNftItemUrl] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const userNickname = useSelector((state) => state.nickname);
  const walletAddress = useSelector((state) => state.address);

  // const handlePictureChange = (e) => {
  //   const file = e.target.files[0];
  //   setMintNftPicture(file);
  // };
  const handlePictureChange = (e) => {
    if (e.target.files[0] !== undefined) {
      const file = e.target.files[0];
      setMintNftPicture(file);
    }
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
    console.log(
      'NFT 정보:',
      nftItem,
      mintNftName,
      mintNftInfo,
      mintNftPrice,
      mintNftTheme
    );
    // 필요한 API 호출 등을 수행할 수 있습니다.
    mintNft();
  };

  // file upload
  const imageUpload = (event) => {
    if (event.target.files[0] !== undefined) {
      // 업로드 한 파일 가져오기
      const file = event.target.files[0];
      setPictureUrl(URL.createObjectURL(file));
      let maxSize = 100;
      let ipfsSize = 50;

      // 파일을 메가바이트 단위로 변환
      let fileSize = file.size / Math.pow(10, 6);

      if (fileSize < maxSize) {
        let fileType = file.type.split('/')[1];
        const imageURL = URL.createObjectURL(file);

        if (
          fileType === 'png' ||
          fileType === 'jpg' ||
          fileType === 'jpeg' ||
          fileType === 'gif'
        ) {
          setCheckFile(0);

          setNftItem(file);
          setNftItemUrl(imageURL);
        } else if (fileType === 'mp4' || fileType === 'mkv') {
          setCheckFile(1);

          setNftItem(file);
          setNftItemUrl(imageURL);
        } else {
          setModalTitle('Error');
          setMessage(
            'File type is not supported. Please upload a PNG, JPG, JPEG, GIF, MP4, or MKV file.'
          );
          setIsModalOpen(true);
        }
      }
    }
  };

  //@notion mintNft API
  function mintNft() {
    mintNftAPI(
      nftItem,
      userNickname,
      mintNftName,
      mintNftInfo,
      mintNftTheme,
      mintNftPrice,
      walletAddress,
      (error, responseData) => {
        if (error) {
          console.error('민팅 실패');
          alert('Minting failed');
        } else {
          console.log('민팅 성공: ', responseData);
          alert('Minting succeeded');
        }
      }
    );
  }

  return (
    <div className="mint-nft-container">
      <h1>Mint NFT</h1>
      <form onSubmit={handleMintNFT} className="mint-nft-form">
        <label htmlFor="input-nft-picture" className="mint-nft-picture">
          {PictureUrl && <img src={PictureUrl} alt="Preview" className="preview-image" />}
          <input
            type="file"
            id="input-nft-picture"
            accept="image/*"
            onChange={(e) => imageUpload(e)}
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
