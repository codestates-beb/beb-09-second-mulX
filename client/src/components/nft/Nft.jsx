import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/Post.module.css';
import NftImg from './NftImg';

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg';
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg';
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg';
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg';

const Nft = () => {
  const InfoArr = [
    [dumyImg1,"Blue sky mountains", "gokite227", 0.001],
                    [dumyImg2, "River and mountain", "sjlee80", 0.02],
                    [dumyImg3, "mountain trail", "stcr96", 0.003],
                    [dumyImg4, "Snowy mountain", "codex1928", 0.1],
                    [dumyImg1,"Blue sky mountains", "gokite227", 0.001],
                    [dumyImg2, "River and mountain", "sjlee80", 0.02],
                    [dumyImg3, "mountain trail", "stcr96", 0.003],
                    [dumyImg4, "Snowy mountain", "codex1928", 0.1],
                    [dumyImg1,"Blue sky mountains", "gokite227", 0.001],
                    [dumyImg2, "River and mountain", "sjlee80", 0.02],
                    [dumyImg3, "mountain trail", "stcr96", 0.003],
                    [dumyImg4, "Snowy mountain", "codex1928", 0.1],
                    [dumyImg1,"Blue sky mountains", "gokite227", 0.001],
                    [dumyImg2, "River and mountain", "sjlee80", 0.02],
                    [dumyImg3, "mountain trail", "stcr96", 0.003],
                    [dumyImg4, "Snowy mountain", "codex1928", 0.1],
    // Add more post data here...
  ];

  const postsPerPage = 12; // 한 페이지에 보여줄 포스트 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  // 현재 페이지에 해당하는 포스트 데이터 슬라이싱
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = InfoArr.slice(startIndex, endIndex);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(InfoArr.length / postsPerPage);
  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.back}>
      <div className={styles.Top}>
        <h1>NFT</h1>
        <Link to="/mintnft" className={styles.postingBtn}>
          Minting
        </Link>
      </div>
      <div className={styles.SearchContainer}>
        <input type="text" placeholder="Search" className={styles.SearchInput} />
        <button className={styles.SearchButton}>Search</button>
      </div>
      <div className={styles.PostContainer}>
        <div className={styles.Postimg}>
          {currentPosts.map((info, i) => {
            return <NftImg PostInfo={info} key={i} />;
          })}
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
