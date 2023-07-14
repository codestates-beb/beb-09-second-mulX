import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import styles from '../../assets/css/PostDetail.module.css';
import { getPostByIdAPI } from '../../apis/getPostById'

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'

const PostDetail = () => {
  const { id } = useParams();
  console.log(id)
  const [Info, seInfo] = useState(null)

  function getPostById(){
    getPostByIdAPI(id, (error, responseData) => {
      if (error) {
        console.log('게시글 디테일 받아오기 실패');
      } else {
        console.log('게시글 디테일 정보', responseData);
        seInfo(responseData)
      }
    })
  }

  useEffect(() => {
    getPostById()
  }, [])

  return (
    <div>
      {Info ?
        (<div className={styles.detailContainer}>
          <div className={styles.imgContainer}>
            <img src={Info.post_img}></img>
          </div>
          <div className={styles.textContainer}>
            <div className={styles.TilteContainer}>
              <h2>{Info.title}</h2>
              <div className={styles.info}>
                <span>{Info.nickname}</span>
                <span>{Info.createdAt}</span>
              </div>
            </div>
            <div className={styles.postbody}>
              <div>
                {Info.content}
              </div>
            </div>
          </div>
        </div>) : (<></>)
      }
    </div>
  )
}

export default PostDetail