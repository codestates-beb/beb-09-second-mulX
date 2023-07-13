import axios from 'axios';

export function transferAPI(email, toAddress, amountSendToken, callback) {
    //@notion 콜백함수로 처리하여 err 핸들링
  axios
    .post('http://localhost:8080/contract/transfer', {
        email: "Leeco@gmail.com",
      toAddress: "0xA80238Ed9E23D0ccfB0b14C880F316d074C61449",
      amountSendToken : "1"
    })
    .then(response => {
      callback(null, response.data); // 성공 시 콜백 호출
    })
    .catch(error => {
      callback(error, null); // 실패 시 콜백 호출
    });
}
