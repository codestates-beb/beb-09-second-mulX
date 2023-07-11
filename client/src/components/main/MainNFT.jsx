import React from 'react'
import styles from '../../assets/css/MainTitle.module.css';
import NftImg from '../nft/NftImg';

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg'
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg'
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg'

const MainNFT = () => {
  //이미지, 이름, 만든사람, 가격, 설명
  const InfoArr = [[dumyImg1,"Blue sky mountains", "gokite227", 0.001],
                    [dumyImg2, "River and mountain", "sjlee80", 0.02],
                    [dumyImg3, "mountain trail", "stcr96", 0.003],
                    [dumyImg4, "Snowy mountain", "codex1928", 0.1],
                    [dumyImg1,"Blue sky mountains", "gokite227", 0.001],
                    [dumyImg2, "River and mountain", "sjlee80", 0.02],
                    [dumyImg3, "mountain trail", "stcr96", 0.003],
                    [dumyImg4, "Snowy mountain", "codex1928", 0.1],]
  return (
    <div className={styles.NFTContainer}>
        <h3>New NFT</h3>
          <div className={styles.NFTimg}>
          {
            InfoArr.map((info, i) => {
              return(
                <NftImg PostInfo={info} key={i}/>
              )
            })
          }
          </div>
      </div>
  )
}

export default MainNFT