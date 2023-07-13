import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/Post.module.css';
import NftImg from './NftImg';
import { getAllNftAPI } from '../../apis/getAllNft';
import { getNftByAddressAPI } from '../../apis/getNftByAddress';
import { getNftPriceAPI } from '../../apis/getNftPrice';
import { buyNftAPI } from '../../apis/buyNft';
import { useSelector } from 'react-redux';

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg';
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg';
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg';
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg';

const Nft = () => {
  const [nftArr, setNftArr] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [nftPrice, setNftPrice] = useState(null);
  const [buynft, setBuyNft] = useState(null);

  function getAllNfts() {
    getAllNftAPI((error, responseData) => {
      if (error) {
        console.log('All NFT 받아오기 실패');
      } else {
        console.log('nft 정보', responseData.nftList);
        setNftArr(responseData.nftList);
      }
    });
  }

  function handleSearch() {
    getNftByAddressAPI(walletAddress, (error, responseData) => {
      if (error) {
        console.log('주소 NFT 받아오기 실패');
      } else {
        console.log('주소 NFT 정보', responseData);
        setNftArr(responseData);
      }
    });
  }

  let tokenId = ''; // test  tokenId = '1'; 입력받아야 함
  function getNftPrice(tokenId) {
    getNftPriceAPI(tokenId, (error, responseData) => {
      if (error) {
        console.log('Nft 가격 받아오기 실패');
      } else {
        console.log('Nft 가격정보', responseData);
        setNftPrice(responseData);
      }
    });
  }

  const userAddress = useSelector((state) => state.address);
  function buyNft(userAddress, tokenId) {
    buyNftAPI(userAddress, tokenId, (error, responseData) => {
      if (error) {
        console.log('Nft 구매 실패');
      } else {
        console.log('Nft 구매정보', responseData);
        setBuyNft(responseData);
      }
    });
  }

  const postsPerPage = 12; // 한 페이지에 보여줄 포스트 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  // 현재 페이지에 해당하는 포스트 데이터 슬라이싱
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = nftArr ? nftArr.slice(startIndex, endIndex) : null;

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 전체 페이지 수 계산
  const totalPages = nftArr ? Math.ceil(nftArr.length / postsPerPage) : null;
  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    getAllNfts();
    //getNftPrice(tokenId);
  }, []);

  return (
    <div className={styles.back}>
      <div className={styles.Top}>
        <h1>NFT</h1>
        <Link to="/mintnft" className={styles.postingBtn}>
          Minting
        </Link>
      </div>
      <div className={styles.SearchContainer}>
        <input
          type="text"
          placeholder="Search"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className={styles.SearchInput}
        />
        <button className={styles.SearchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className={styles.PostContainer}>
        <div className={styles.Postimg}>
          {nftArr ? (
            nftArr.map((info, i) => {
              return <NftImg PostInfo={info.tokenURI} key={i} />;
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.Pagination}>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={currentPage === pageNumber ? styles.activePage : styles.pageButton}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Nft;
