import axios from 'axios';

export async function signUp(email, nickname, password) {
  try {
    const response = await axios.post('http://localhost:8080/user/signup', {
      email: email,
      nickname: nickname,
      password: password,
    });

    console.log('회원가입 성공:', response.data);
  } catch (error) {
    console.error('회원가입 실패:', error);
  }
}
