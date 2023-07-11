import React from 'react'
import styles from '../../assets/css/NftImg.module.css';

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg'
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg'
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg'

const NftImg = ({ PostInfo }) => {
  return (
    <div className={styles.NftContainer}>
      <div className={styles.PostInfo}>
      
        <span className={styles.write}>{PostInfo[2]}</span>
        <h3 className={styles.title}>{PostInfo[1]}</h3>
        <span className={styles.day}>{PostInfo[3]}</span>
        
      </div>
      <img src={PostInfo[0]} className={styles.NftImg} alt="Post Image" />
    </div>
  )
}

export default NftImg