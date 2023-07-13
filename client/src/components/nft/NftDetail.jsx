import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import styles from '../../assets/css/NftDetail.module.css';
import { buyNftAPI } from '../../apis/buyNft';
import { getNftByTokenidAPI } from '../../apis/getNftByTokenid';
import { useSelector } from 'react-redux';
import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'

const NftDetail = () => {
  const { id } = useParams();
  const [buynft, setBuyNft] = useState(null);
  const [nftUrl, setNftUrl] = useState(null);
  const [data, setData] = useState(null);
  const [ImgUrl, setImgUrl] = useState(null);

  function getNftByTokenid(){
    getNftByTokenidAPI(id, (error, responseData)=> {
      if(error){
        console.log('nft 받아오기 실패');
      } else{
        console.log('nft 디테일 정보', responseData.tokenURI);
        setNftUrl(responseData.tokenURI)
      }
    })
  }

  const userAddress = useSelector((state) => state.address);
  
  function buyNft() {
    buyNftAPI(userAddress, id, (error, responseData) => {
      if (error) {
        console.log('Nft 구매 실패');
      } else {
        console.log('Nft 구매정보', responseData);
        setBuyNft(responseData);
      }
    });
  }

  useEffect(()=>{
    getNftByTokenid()
  },[])

  // useEffect(() => {
  //   fetch(nftUrl)
  //     .then(response => response.json())
  //     .then(jsonData => {
  //       setData(jsonData);
  //       console.log(data)
  //       const url = jsonData ? jsonData.image.replace('ipfs://', 'https://ipfs.io/ipfs/') : null;
  //       setImgUrl(url);
  //     });
  // }, []);

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
                <button className={styles.buyBtn} onClick={buyNft}><h3>Buy now</h3></button>
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