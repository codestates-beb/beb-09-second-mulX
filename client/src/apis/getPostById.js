import axios from 'axios';

export function getPostByIdAPI(id, callback) {
  axios
    .get(`http://localhost:8080/post/${id}`)
    .then(response => {
      callback(null, response.data); // 성공 시 콜백 호출
    })
    .catch(error => {
      callback(error, null); // 실패 시 콜백 호출
    });
}