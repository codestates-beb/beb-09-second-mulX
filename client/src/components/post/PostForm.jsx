import React, { useState, useRef } from 'react';
import '../../assets/css/postForm.css';
import { useNavigate } from 'react-router-dom';
import { postFormAPI } from '../../apis/postForm';
import { useSelector } from 'react-redux';

const PostForm = () => {
  const useremail = useSelector((state) => state.email);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 게시글 등록 처리 로직 작성
    console.log('게시글 정보:', useremail, title, content, selectedImage);
    // 필요한 API 호출 등을 수행할 수 있습니다.
    postFormAPI(useremail, title, content, selectedImage);
    navigate('/');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="postform-container">
      <form onSubmit={handleSubmit} className="postform-form">
        <h1>게시글 작성</h1>
        <div className="form-field">
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="content">본문:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-field">
          <button type="button" onClick={handleFileClick}>사진 선택하기</button>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </div>
        <button type="submit">게시글 등록</button>
      </form>
    </div>
  );
}

export default PostForm;
