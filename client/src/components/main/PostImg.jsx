import React from 'react'
import styles from '../../assets/css/PostImg.module.css';

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg'
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg'
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg'

const MainPostImg = ( {img} ) => {
  return (
    <div className={styles.PostContainer}>
        <img  src={img} className={styles.PostImg}></img>
        <div className={styles.PostInfo}>
            <div>
                <span>2023.07.05</span>
                <span>작성자</span>
            </div>
            <h3>제목</h3>
        </div>
    </div>
  )
}

export default MainPostImg