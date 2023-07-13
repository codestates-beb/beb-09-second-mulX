import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/Post.module.css';
import PostImg from './PostImg';
import { getAllPostAPI } from '../../apis/getAllPost'
import { getPostByEmailAPI } from '../../apis/getPostByEmail'

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg';
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg';
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg';
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg';

const Post = () => {
  const [postArr, setPostArr] = useState(null)
  const [search, setSearch] = useState('');

  const postsPerPage = 8; // 한 페이지에 보여줄 포스트 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  // 현재 페이지에 해당하는 포스트 데이터 슬라이싱
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = postArr? postArr.slice(startIndex, endIndex) : null ;

  function getAllPost() {
    getAllPostAPI((error, responseData) => {
      if (error) {
        console.log('게시글 받아오기 실패');
      } else {
        console.log('게시글 정보', responseData);
        setPostArr(responseData)
      }
    });
  }


  useEffect(() => {
    getAllPost()
  },[])


  function getPostEmail(){
    getPostByEmailAPI(search,(error, responseData) => {
      if(error){
        console.log('이메일 게시글 받아오기 실패');
      } else{
        console.log('이메일 게시글 정보', responseData);
        setPostArr(responseData)
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // 게시글 등록 처리 로직 작성
    console.log('검색어 정보:', search);
    // 필요한 API 호출 등을 수행할 수 있습니다.
    getPostEmail()
  };

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 전체 페이지 수 계산
  const totalPages = postArr? Math.ceil(postArr.length / postsPerPage) : null ;
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
      <form onSubmit={handleSubmit}>
        <div className={styles.SearchContainer}>
          <input 
            type="text" 
            placeholder="Search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.SearchInput}
            />
          <button type="submit" className={styles.SearchButton}>Search</button>
        </div>
      </form>
      <div className={styles.PostContainer}>
        <div className={styles.Postimg}>
          {postArr? postArr.map((info) => {
            return <Link to={`/postdetail/${info.post_id}`}><PostImg PostInfo={info} key={info.post_id} /></Link>;
          }): <></>}
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
