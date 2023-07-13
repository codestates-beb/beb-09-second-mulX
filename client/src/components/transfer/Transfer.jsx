import React, { useState } from 'react';
import '../../assets/css/transfer.css';

const Transfer = () => {
  const [targetAddress, setTargetAddress] = useState('');
  const [transferFailure, setTransferFailure] = useState(null);

  const handleAddressChange = (e) => {
    setTargetAddress(e.target.value);
  };

  const validateTransferFailure = (error) => {
    if (error.response.status === 400) {
      setTransferFailure('지갑 주소를 입력해주세요.');
    } else if (error.response.status === 500) {
      setTransferFailure('지갑 주소를 확인해주세요.');
    } else {
      setTransferFailure('알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleSendCoins = () => {
    // 코인을 보내는 로직을 작성하세요.
    // 예: API 호출 등

    console.log(`Sending coins to ${targetAddress}`);
    // 코인 전송 완료 메시지를 표시하는 등의 추가 작업을 수행할 수 있습니다.
  };

  return (
    <div>
      <div className='transfer-container'>
        <h1>mulX Transfer</h1>
        <form onSubmit={handleSendCoins} className='transfer-form'>
          <label htmlFor="target-address">지갑 주소</label>
          <input
            type="text"
            id="target-address"
            value={targetAddress}
            placeholder='토큰을 보낼 주소를 입력해주세요.'
            onChange={handleAddressChange}
            required
          />
          <button type="submit">Send mulX</button>
          {transferFailure && <div className="failure-message">{validateTransferFailure}</div>}
          {targetAddress.length > 0 && !transferFailure && <div className="success-message">성공했습니다.</div>}
        </form>
      </div>
    </div>
  );
};

export default Transfer;
