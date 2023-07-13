import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/NftImg.module.css';

const NftImg = ({ PostInfo }) => {
  const [data, setData] = useState({});
  const [imgUrl, setImgUrl] = useState(null)

  useEffect(() => {
    fetch(PostInfo)
      .then(response => response.json())
      .then(jsonData => setData(jsonData));
    setImgUrl(data.image.replace('ipfs://', 'https://ipfs.io/ipfs/'))
  }, []);

  
  return (
    <div className={styles.NftContainer}>
      <div className={styles.PostInfo}>
      
        <span className={styles.write}>{data.name}</span>
        <h3 className={styles.title}>{data.title}</h3>
        <span className={styles.day}>{data.category}</span>
        
      </div>
      <img src={imgUrl} className={styles.NftImg} alt="Post Image" />
    </div>
  )
}

export default NftImg