import React, { useState, useRef } from 'react';
import "../components/signup/signup.css";

const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직 작성
    console.log('가입 정보:', password, confirmPassword, nickname, profilePicture);
    // 필요한 API 호출 등을 수행할 수 있습니다.
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Welcome!</h2>
        <div className="form-field">
          <label htmlFor="id">아이디:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
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
        <div className="form-field">
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
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
          <label htmlFor="profilePicture">프로필 사진 추가하기</label>
          <button type="button" onClick={handleFileClick}>파일 선택</button>
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
      </form>
    </div>
  );
}

export default Signup;
