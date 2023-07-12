import React from 'react'
import { useParams } from 'react-router-dom';

import styles from '../../assets/css/NftDetail.module.css';

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'

const NftDetail = () => {
  return (
    <>
      <div className={styles.detailContainer}>
        <div className={styles.left}>
            <div className={styles.imageContainer}>
              <img src={dumyImg1} alt="NFT image" className={styles.squareImage} />
            </div>
            
            
        </div>
        <div className={styles.right}>
            <div className={styles.titleContainer}>
                <h1 className={`${styles.title} ${styles.owned} ${styles.titleSize}`}>Title</h1>
                <p className={`${styles.title} ${styles.owned}`}>Owned by gokite227</p>
            </div>
            
            
            <div className={styles.priceContainer}>
                <div>
                    <span>Current price</span>
                    <h1 className={styles.priceVal}>0.1ETH</h1>
                </div>
                <button className={styles.buyBtn}><h3>Buy now</h3></button>
            </div>

            <div className={styles.Description}>
                <h3 className={styles.DescriptionH3}>Description</h3>
                <div className={styles.DescriptionLine}></div> {/* Add a separate div for the line */}
                <p className={styles.DescriptionP}>설명적는곳</p>
                <div className={styles.DescriptionLine}></div>
                <h3 className={styles.DescriptionDitails}>Details</h3>
                <div className={styles.DescriptionLine}></div>
                <div className={styles.DescriptionVal}>
                    <div >
                    Category
                    <span className={styles.rightAlign}>카테고리</span>
                    </div>
                    
                </div>
            </div>
            
        </div>
      </div>
    </>
  )
}

export default NftDetail