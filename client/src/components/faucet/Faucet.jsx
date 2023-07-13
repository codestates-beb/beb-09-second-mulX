import React, { useState } from 'react';
import '../../assets/css/faucet.css';

const Faucet = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [faucetFailure, setFaucetFailure] = useState(null);

  const validateFaucetFailure = (error) => {
    if (error.response.status === 400) {
      setFaucetFailure('지갑 주소를 입력해주세요.');
    } else if (error.response.status === 500) {
      setFaucetFailure('지갑 주소를 확인해주세요.');
    } else {
      setFaucetFailure('알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleSendCoins = () => {
    // 코인을 보내는 로직을 작성하세요.
    // 예: API 호출 등

    console.log(`Sending coins to ${walletAddress}`);
    // 코인 전송 완료 메시지를 표시하는 등의 추가 작업을 수행할 수 있습니다.
  };

  return (
    <div>
      <div className='faucet-container'>
        <h1>mulX Faucet</h1>
        <form onSubmit={handleSendCoins} className='faucet-form'>
          <label htmlFor="wallet-address">지갑 주소</label>
          <button type="submit">Send mulX</button>
          {faucetFailure && <div className="failure-message">{validateFaucetFailure}</div>}
          {walletAddress.length > 0 && !faucetFailure && <div className="success-message">성공했습니다.</div>}
        </form>
      </div>
    </div>
  );
};

export default Faucet;
