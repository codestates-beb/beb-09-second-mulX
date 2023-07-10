import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import { loginAPI } from '../../apis/login';

const Login = () => {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function login(){
    //@notion API 사용 함수를 따로 선언하여 에러 핸들링 및 화면 전환
    loginAPI(useremail, password, (error, responseData) => {
      if(error){
        console.log("로그인 실패")
        console.log(error.response.status)
        if(error.response.status == 401){
          //@notion 비밀번호 틀렸을 때 응답코드 401
          alert('비밀번호가 잘못되었습니다. 다시 시도해주세요.');
        }else if(error.response.status == 404){
          //@notion 없는 이메일 일때 응답코드 404
          alert('없는 회원입니다. 다시 시도해주세요.');
        }
        else{alert('로그인에 실패하셨습니다. 다시 시도해주세요.');}
      }
      else{
        console.error('로그인 성공: ', responseData)
        //@notion 로그인 성공시 메인으로 화면 전환
        navigate('/');
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //@notion API사용 함수를 호출하여 로그인 실행
    login()
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Welcome Back!</h1>
        <div className="form-field">
          <label htmlFor="useremail">이메일:</label>
          <input
            type="text"
            id="useremail"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
        <div className="signup-link">
          <Link to="/signup">아직 회원이 아니신가요?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;