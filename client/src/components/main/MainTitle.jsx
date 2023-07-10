import React from 'react'

import styles from '../../assets/css/MainTitle.module.css';
import MainBgImg from '../../assets/img/mountains-55067_640.png'

const MainTitle = () => {

  //타이틀을 나타내는 페이지
  return (
    <div>
      <div className={styles.MainContainer} >
        <img className={styles.MainBgImg} src={MainBgImg}></img>
        {/* 메인 배경이미지 */}
        <div className={styles.TitleContainer}>
          {/*메인 타이플 설명*/}
          <h2 className={styles.MainTitle}>MulX</h2>
          <div className={styles.MainText}>등산하는 사람들을 위한 인센티브 기반 커뮤니티</div>
        </div>
      </div>
      
    </div>
  )
}

export default MainTitle