import React, { useEffect } from 'react';
import styles from '../assets/css/MainPage.module.css';
import MainTitle from '../components/main/MainTitle';
import MainPost from '../components/main/MainPost';
import MainNFT from '../components/main/MainNFT';

const Main = () => {
  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      // 스크롤 이벤트에 따른 애니메이션 처리
      // 예시: 스크롤 위치에 따라 요소 애니메이션 추가/제거 등을 수행할 수 있습니다.
      console.log('Scrolling...');
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 해제
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 이펙트가 실행되도록 합니다.

  return (
    <div className={styles.mainPage}>
      <MainTitle />
      <MainPost />
      <MainNFT />
    </div>
  );
};

export default Main;
