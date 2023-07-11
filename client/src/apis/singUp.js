import axios from 'axios';

export async function signUpAPI(email, nickname, password, image, callback) {
  try {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('email', email);
    formData.append('nickname', nickname);
    formData.append('password', password);

    const response = await axios.post('http://localhost:8080/user/signup', formData);

    callback(null, response.data);
  } catch (error) {
    callback(error, null);
  }
}
