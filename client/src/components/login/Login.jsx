import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/login.css';

const Login = () => {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 작성
    console.log('로그인 정보:', useremail, password);
    // 필요한 API 호출 등을 수행할 수 있습니다.
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
