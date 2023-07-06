import React, { useState } from 'react'
import styles from '../../assets/css/MainTitle.module.css';
import PostImg from './PostImg';

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg'
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg'
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg'

const MainPost = () => {
  //@notion 메인에 나오는 최신 포스트 화면
  
  const InfoArr = [[dumyImg1,"Blue sky and green mountains", "gokite227", "2023.07.06"],
                    [dumyImg2, "River and mountain with clear water", "sjlee80", " 2023.07.05"],
                    [dumyImg3, "There is a mountain at the end of the trail", "stcr96", "2023.07.04"],
                    [dumyImg4, "Snowy mountain wonders", "codex1928", "2023.07.03"]]
  return (
    <div className={styles.PostContainer}>
    <h3 className={styles.PostTitle}>New Post</h3>
    {/* @notion 배열에있는 post 불러오기 */}
    <div className={styles.Postimg}>
      {
        InfoArr.map((info, i) => {
          return(
            <PostImg PostInfo={info} key={i}/>
          )
        })
      }
    </div>
  </div>
  )
}

export default MainPost