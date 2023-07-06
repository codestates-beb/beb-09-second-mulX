import axios from 'axios';

export async function login(email, password) {
    try {
        const response = await axios.post('http://localhost:8080/users/login', {
            email: email,
            password: password,
        });

        console.log('로그인 성공:', response.data);
    } catch (error) {
        console.error('로그인 실패:', error);
    }
}