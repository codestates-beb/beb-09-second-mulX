// api.js
import axios from 'axios';

export function postFormAPI(email, title, contents, image) {
  //@notion 콜백함수로 처리하여 err 핸들링
  axios
    .post('http://localhost:8080/post', {
      email: email,
      title: title,
      contents: contents,
      image: image,
    }) // 성공 시 콜백 호출
}
