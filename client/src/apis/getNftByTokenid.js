import axios from 'axios';

export function getNftByTokenidAPI(tokenId, callback) {
  axios
    .get(`http://localhost:8080/nft/search/${tokenId}`)
    .then((response) => {
      callback(null, response.data); // 성공 시 콜백 호출
    })
    .catch((error) => {
      callback(error, null); // 실패 시 콜백 호출
    });
}
