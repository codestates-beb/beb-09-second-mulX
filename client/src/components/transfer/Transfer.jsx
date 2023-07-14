import React, { useState } from 'react';
import '../../assets/css/transfer.css';
import { useDispatch, useSelector } from 'react-redux';
import { transferAPI } from '../../apis/transfer';
import { setTokenAmount } from '../../Redux/userSlice';

const Transfer = () => {
  const [targetAddress, setTargetAddress] = useState('');
  const [SendToken, setSendToken] = useState('');
  const [transferFailure, setTransferFailure] = useState(null);

  const useremail = useSelector((state) => state.email);

  const dispatch = useDispatch();

  const handleAddressChange = (e) => {
    setTargetAddress(e.target.value);
  };

  const handleSendTokenChange = (e) => {
    setSendToken(e.target.value);
  };

  function transfer() {
    transferAPI(useremail, targetAddress, SendToken, (error, responseData) => {
      if (error) {
        console.log('전송 실패');
        alert('Transfer failed');
      } else {
        console.log('전송 성공', responseData);
        dispatch(setTokenAmount(responseData.data.balance));
        alert('Transfer succeeded');
      }
    });
  }

  const handleSendCoins = (e) => {
    e.preventDefault();
    // 코인을 보내는 로직을 작성하세요.
    // 예: API 호출 등
    transfer();
    console.log(`Sending coins to`, useremail, targetAddress, SendToken);
    // 코인 전송 완료 메시지를 표시하는 등의 추가 작업을 수행할 수 있습니다.
  };

  return (
    <div>
      <div className="transfer-container">
        <h1>mulX Transfer</h1>
        <form onSubmit={handleSendCoins} className="transfer-form">
          <label htmlFor="target-address">지갑 주소</label>
          <input
            type="text"
            id="target-address"
            value={targetAddress}
            placeholder="토큰을 보낼 주소를 입력해주세요."
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            id="target-address"
            value={SendToken}
            placeholder="토큰 보낼 가격을 입력해주세요."
            onChange={handleSendTokenChange}
            required
          />
          <button type="submit">Send mulX</button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
