import React from 'react'
import styles from '../../assets/css/MainTitle.module.css';

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg'
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg'
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg'

const MainNFT = () => {
  return (
    <div className={styles.NFTContainer}>
        <h3>New NFT</h3>
          <div className={styles.NFTimg}>
            <img  src={dumyImg1}></img>
            <img  src={dumyImg2}></img>
            <img  src={dumyImg3}></img>
            <img  src={dumyImg4}></img>
          </div>
          <div className={styles.NFTimg}>
            <img  src={dumyImg1}></img>
            <img  src={dumyImg2}></img>
            <img  src={dumyImg3}></img>
            <img  src={dumyImg4}></img>
          </div>
      </div>
  )
}

export default MainNFT