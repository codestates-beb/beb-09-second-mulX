import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImg } from '../../Redux/userSlice';
import "../../assets/css/mypage.css";
import PostImg from '../post/PostImg'

import { getUserAPI } from '../../apis/userfind'
import { getPostByEmailAPI } from '../../apis/getPostByEmail'

import dumyImg1 from '../../assets/img/mountain-world-1495832_1280.jpg'
import dumyImg2 from '../../assets/img/mountains-4467436_1280.jpg'
import dumyImg3 from '../../assets/img/path-4353699_1280.jpg'
import dumyImg4 from '../../assets/img/snow-6071475_1280.jpg'
import NftImg from '../nft/NftImg';

const MyPage = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const useremail = useSelector((state) => state.email)
  const userNickname = useSelector((state) => state.nickname);
  const walletAddress = useSelector((state) => state.address);
  const tokenCount = useSelector((state) => state.token_amount);
  const ethCount = useSelector((state) => state.eth_amount);

  const [proImg, setImg] = useState(null)
  const [postArr, setPostArr] = useState(null)

  const dispatch = useDispatch();

  function getUser() {
    getUserAPI(useremail, (error, responseData) => {
      if (error) {
        console.log('회원 찾기 실패');
      } else {
        //console.log('회원 정보', responseData.data.profile_img);
        //console.log(responseData.data.profile_img)
        setImg(responseData.data.profile_img)
        dispatch(setProfileImg(responseData.data.profile_img))
      }
    });
  }

  function getPostEmail(){
    getPostByEmailAPI(useremail,(error, responseData) => {
      if(error){
        console.log('이메일 게시글 받아오기 실패');
      } else{
        console.log('이메일 게시글 정보', responseData);
        setPostArr(responseData)
      }
    })
  }

  useEffect(() => {
    getUser()
    getPostEmail()
  },[])

  const InfoArr = [[dumyImg1,"Blue sky and green mountains", "gokite227", "2023.07.06"],
                    [dumyImg2, "River and mountain with clear water", "sjlee80", " 2023.07.05"],
                    [dumyImg3, "There is a mountain at the end of the trail", "stcr96", "2023.07.04"],
                    [dumyImg4, "Snowy mountain wonders", "codex1928", "2023.07.03"],
                    [dumyImg1,"Blue sky and green mountains", "gokite227", "2023.07.06"],
                    [dumyImg2, "River and mountain with clear water", "sjlee80", " 2023.07.05"]]

  


  return (
    <div className="mypage-container">
      <div className="picture-section">
        <div className="profile-picture">
            <img src={proImg} alt="프로필 사진" />
        </div>
      </div>
      <div className="profile-section">
        <div className="profile-details">
          <h2 className="profile-Nicname">{userNickname}</h2>
          <div className="address-details">
            <div className="profile-wallet">
              <div>walletAddress: {walletAddress}</div>
              <div>토큰 개수: {tokenCount}</div>
              <div>Eth : {ethCount}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="my-posts-section">
        <h2>my Post</h2>
        <div className="imgGrid">
          {postArr? postArr.map((info) => {
            return <Link to={`/postdetail/${info.post_id}`}><PostImg PostInfo={info} key={info.post_id} /></Link>;
          }): <></>}
        </div>
      </div>
      <div className="my-nfts-section">
        <h2>my NFT</h2>
        <div className="imgGrid">
        {
            InfoArr.map((info, i) => {
              return(
                <NftImg PostInfo={info} key={i}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default MyPage;
