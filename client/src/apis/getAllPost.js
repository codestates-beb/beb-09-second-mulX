import axios from 'axios';

export function getAllPostAPI(callback) {
  axios
    .get(`http://localhost:8080/post`)
    .then(response => {
      callback(null, response.data); // 성공 시 콜백 호출
    })
    .catch(error => {
      callback(error, null); // 실패 시 콜백 호출
    });
}