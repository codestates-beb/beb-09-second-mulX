import axios from 'axios';

export function getUserAPI(email, callback) {
  axios
    .get(`http://localhost:8080/user/${email}`)
    .then(response => {
      callback(null, response.data); // 성공 시 콜백 호출
    })
    .catch(error => {
      callback(error, null); // 실패 시 콜백 호출
    });
}

function decodeImage(imageData) {
    const decodedData = decodeURIComponent(imageData);
    const buffer = Buffer.from(decodedData, 'binary');
    return buffer;
  }
  
  
