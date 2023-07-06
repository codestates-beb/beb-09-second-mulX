// api.js
import axios from 'axios';

export function signUpAPI(email, nickname, password, callback) {
  //@notion 콜백함수로 처리하여 err 핸들링
  axios
    .post('http://localhost:8080/user/signup', {
      email: email,
      nickname: nickname,
      password: password,
    })
    .then(response => {
      callback(null, response.data); // 성공 시 콜백 호출
    })
    .catch(error => {
      callback(error, null); // 실패 시 콜백 호출
    });
}
