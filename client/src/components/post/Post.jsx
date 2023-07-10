import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/Post.module.css';
import PostImg from './PostImg';

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg';
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg';
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg';
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg';

const Post = () => {
  const InfoArr = [
    [dumyImg1, "Blue sky and green mountains", "gokite227", "2023.07.06"],
    [dumyImg2, "River and mountain with clear water", "sjlee80", " 2023.07.05"],
    [dumyImg3, "There is a mountain at the end of the trail", "stcr96", "2023.07.04"],
    [dumyImg4, "Snowy mountain wonders", "codex1928", "2023.07.03"],
    [dumyImg1, "Blue sky and green mountains", "gokite227", "2023.07.06"],
    [dumyImg2, "River and mountain with clear water", "sjlee80", "2023.07.05"],
    [dumyImg3, "There is a mountain at the end of the trail", "stcr96", "2023.07.04"],
    [dumyImg4, "Snowy mountain wonders", "codex1928", "2023.07.03"],
    [dumyImg1, "Blue sky and green mountains", "gokite227", "2023.07.06"],
    [dumyImg2, "River and mountain with clear water", "sjlee80", "2023.07.05"],
    [dumyImg3, "There is a mountain at the end of the trail", "stcr96", "2023.07.04"],
    [dumyImg4, "Snowy mountain wonders", "codex1928", "2023.07.03"],
    // Add more post data here...
  ];

  const postsPerPage = 8; // 한 페이지에 보여줄 포스트 수
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
        <h1>Post</h1>
        <Link to="/postform" className={styles.postingBtn}>
          Posting
        </Link>
      </div>
      <div className={styles.SearchContainer}>
        <input type="text" placeholder="Search" className={styles.SearchInput} />
        <button className={styles.SearchButton}>Search</button>
      </div>
      <div className={styles.PostContainer}>
        <div className={styles.Postimg}>
          {currentPosts.map((info, i) => {
            return <PostImg PostInfo={info} key={i} />;
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

export default Post;
