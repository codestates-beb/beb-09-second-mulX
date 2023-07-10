import React from 'react'
import styles from '../../assets/css/PostDetail.module.css';

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'

const PostDetail = () => {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.imgContainer}>
        <img src={dumyImg1}></img>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.TilteContainer}>
          <h2>Title</h2>
          <div className={styles.info}>
            <span>작성자</span>
            <span>2023.07.07</span>
          </div>
        </div>
        <div className={styles.postbody}>
          <div>
            안녕하세요! 화창한 여름에 등산을 다녀왔습니다. 푸르른 나무들을 보니 기분이 좋아지더군요. 다들 등산 츄라이^^
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail