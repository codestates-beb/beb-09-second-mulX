import React from 'react'

import styles from '../../assets/css/MainTitle.module.css';
import MainBgImg from '../../assets/img/mountains-55067_640.png'

const MainTitle = () => {
  return (
    <div>
      <div className={styles.MainContainer} >
        <img className={styles.MainBgImg} src={MainBgImg}></img>
        <div className={styles.TitleContainer}>
          <h2 className={styles.MainTitle}>MulX</h2>
          <div className={styles.MainText}>등산하는 사람들을 위한 인센티브 기반 커뮤니티</div>
        </div>
      </div>
      
    </div>
  )
}

export default MainTitle