import React, { useState } from 'react';
import '../../assets/css/faucet.css';
import { useDispatch, useSelector } from 'react-redux';
import { faucetAPI } from '../../apis/faucet';
import { setEthAmount } from '../../Redux/userSlice';

const Faucet = () => {
  const useremail = useSelector((state) => state.email);
  const [faucetFailure, setFaucetFailure] = useState(null);
  const dispatch = useDispatch();

  function faucet(){
    faucetAPI(useremail, (error, responseData)=>{
      if (error) {
        console.log('테스트 이더 실패');
      } else {
        console.log('테스트 이더 성공', responseData)
        console.log('테스트 이더 성공', responseData.data.balance)
        dispatch(setEthAmount(responseData.data.balance))
      }
    })
  }

  const handleSendCoins = (e) => {
    e.preventDefault();
    // 코인을 보내는 로직을 작성하세요.
    // 예: API 호출 등
    faucet()
    //console.log(`Sending coins to ${walletAddress}`);
    // 코인 전송 완료 메시지를 표시하는 등의 추가 작업을 수행할 수 있습니다.
  };

  return (
    <div>
      <div className='faucet-container'>
        <h1>mulX Faucet</h1>
        <form onSubmit={handleSendCoins} className='faucet-form'>
          <label htmlFor="wallet-address">지갑 주소</label>
          <button type="submit">Send mulX</button>
        </form>
      </div>
    </div>
  );
};

export default Faucet;
