// api.js
import axios from 'axios';

export function ERC20RewardAPI(email, callback) {
    //@notion 콜백함수로 처리하여 err 핸들링
  axios
    .post('http://localhost:8080/contract/token', {
      email: email,
      tokenAmount: "1",
    })
    .then(response => {
      callback(null, response.data); // 성공 시 콜백 호출
    })
    .catch(error => {
      callback(error, null); // 실패 시 콜백 호출
    });
}
