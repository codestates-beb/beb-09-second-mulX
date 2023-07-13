import React from 'react';
import styles from '../../assets/css/PostImg.module.css';

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg';
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg';
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg';
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg';
import { Link } from 'react-router-dom';

const MainPostImg = ({ PostInfo, idx }) => {
  return (
    
      <div className={styles.PostContainer}>
        <div className={styles.PostInfo}>
        
          <span className={styles.write}>{PostInfo.email}</span>
          <h3 className={styles.title}>{PostInfo.title}</h3>
          <span className={styles.day}>{PostInfo.createdAt}</span>
          
        </div>
        <img src={PostInfo.post_img} className={styles.PostImg} alt="Post Image" />
      </div>

  );
};

export default MainPostImg;
