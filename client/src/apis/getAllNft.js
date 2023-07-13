import axios from 'axios';

export function getAllNftAPI(callback) {
  axios
    .get(`http://localhost:8080/nft`)
    .then((response) => {
      callback(null, response.data); // 성공 시 콜백 호출
      console.log(response.data);
    })
    .catch((error) => {
      callback(error, null); // 실패 시 콜백 호출
    });
}
