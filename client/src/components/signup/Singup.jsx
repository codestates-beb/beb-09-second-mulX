import React, { useState, useRef } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import '../../assets/css/signup.css';
import { signUpAPI } from '../../apis/singUp';

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
  const navigate = useNavigate();

  async function signUp() {
     //@notion API 사용 함수를 따로 선언하여 에러 핸들링 및 화면 전환
    signUpAPI(useremail, nickname, password, profilePicture, (error, responseData) => {
      if (error) {
        if(error.response.status == 409){
          //@notion 아이디 중복일 때 응답코드 409
          alert('이미 있는 아이디입니다. 다른 아이디로 시도해주세요.');
        }
        else{
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
        
      }
      else{
        console.error('회원가입 성공: ', responseData)
        //@notion 회원가입에 성공하면 alert확인후 login 페이지로 이동
        alert('회원가입이 성공적으로 완료되었습니다.');
        navigate('/login');
      }
    })
  }  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('가입 정보:', useremail, password, confirmPassword, nickname, profilePicture);
     //@notion API사용 함수를 호출하여 로그인 실행
      signUp();
  };

  const handleFileChange = (e) => {
    if (e.target.files[0] !== undefined){
      const file = e.target.files[0];
      setProfilePicture(file);
    }
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

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Welcome!</h1>
        <div className="form-field">
          <input
            type="text"
            id="useremail"
            placeholder='이메일을 입력해주세요.'
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
          <input
            type="password"
            id="password"
            placeholder='비밀번호를 입력해주세요.'
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
          <input
            type="password"
            id="confirmPassword"
            placeholder='비밀번호를 다시 입력해주세요.'
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
          <input
            type="text"
            id="nickname"
            placeholder='닉네임을 입력해주세요.'
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
            onChange={(e) => handleFileChange(e)}
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
