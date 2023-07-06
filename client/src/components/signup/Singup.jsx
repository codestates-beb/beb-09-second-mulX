import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/signup.css';

const Signup = () => {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

  const [useremailFailure, setUseremailFailure] = useState(null);
  const [passwordFailure, setPasswordFailure] = useState(null);
  const [confirmPasswordFailure, setConfirmPasswordFailure] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직 작성
    console.log('가입 정보:', useremail, password, confirmPassword, nickname, profilePicture);
    // 필요한 API 호출 등을 수행할 수 있습니다.
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const validateUseremail = (value) => {
    const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!value) {
      return ''
    } else if (!emailReg.test(value)) {
      return '유효한 이메일 주소를 입력해주세요.';
    } else {
      return '';
    }
  };
  const validatePassword = (value) => {
    if (!value) {
      return '';
    } else if (value.length < 10) {
      return '비밀번호는 10자리 이상이어야 합니다.';
    } else {
      return '';
    }
  };
  const validateConfirmPassword = (password, confirmPassword) => {
    if (password.length === 0 || confirmPassword.length === 0) {
      return '';
    } else if (password !== confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    } else {
      return '';
    }
  };

  // let elInputUsername = document.querySelector('#username')

  // let elSuccessMsg = document.querySelector('.success-message');
  // let elFailureMsg = document.querySelector('.failure-message');

  // const isMoreThan5Length = function (value) {
  //   return value.length >= 5;
  // }
  
  // elInputUsername.onkeyup = () => {
  //   if (isMoreThan5Length(elInputUsername.value)) {
  //     elSuccessMsg.classList.remove('hide');
  //     elFailureMsg.classList.add('hide');
  //   } else {
  //     elSuccessMsg.classList.add('hide');
  //     elFailureMsg.classList.remove('hide');
  //   }
  // }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Welcome!</h1>
        <div className="form-field">
          <label htmlFor="useremail">이메일:</label>
          <input
            type="text"
            id="useremail"
            value={useremail}
            onChange={(e) => {
              setUseremail(e.target.value);
            }}
            onKeyUp={(e) => {
              setUseremailFailure(e.target.value ? validateUseremail(e.target.value) : '');
            }}
            required
          />
          {useremailFailure && <div className="failure-message">{useremailFailure}</div>}
          {useremail.length>0 && !useremailFailure && <div className="success-message">사용할 수 있는 이메일입니다.</div>}
        </div>
        <div className="form-field">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              const validPasswordResult = validatePassword(e.target.value);
              setPasswordFailure(validPasswordResult);
            }}
            required
          />
          {passwordFailure && <div className="failure-message">{passwordFailure}</div>}
          {password.length >= 10 && !passwordFailure && <div className="success-message">비밀번호가 유효합니다.</div>}
        </div>
        <div className="form-field">
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyUp={(e) => {
              const validConfirmPasswordResult = validateConfirmPassword(password, e.target.value);
              setConfirmPasswordFailure(validConfirmPasswordResult);
            }}
            required
          />
          {confirmPasswordFailure && <div className="failure-message">{confirmPasswordFailure}</div>}
          {confirmPassword.length>0 && !confirmPasswordFailure && <div className="success-message"></div>}
        </div>
        <div className="form-field">
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <button type="button" onClick={handleFileClick}>프로필 사진 추가하기</button>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </div>
        <button type="submit">회원가입</button>
        <div className="login-link">
        <Link to="/login">이미 회원이신가요?</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
