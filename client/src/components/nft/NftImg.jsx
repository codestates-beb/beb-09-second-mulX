import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/NftImg.module.css';

const NftImg = ({ PostInfo }) => {
  const [data, setData] = useState(null);
  const [imgUrl, setImgUrl] = useState(null)

  useEffect(() => {
    fetch(PostInfo)
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
        const url = jsonData ? jsonData.image.replace('ipfs://', 'https://ipfs.io/ipfs/') : null;
        setImgUrl(url);
      });
  }, []);

  useEffect(() => {
    console.log("image", imgUrl);
    // imgUrl을 사용하는 다른 로직 실행
  }, [imgUrl]);

  return (
    <div className={styles.NftContainer}>
      <div className={styles.PostInfo}>
        <span className={styles.write}>{data? data.name : null}</span>
        <h3 className={styles.title}>{data? data.title : null}</h3>
        <span className={styles.day}>{data? data.category : null}</span>
      </div>
      <img src={imgUrl} className={styles.NftImg} alt="Post Image" />
    </div>
  );
};

export default NftImg;
