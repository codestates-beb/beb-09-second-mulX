import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Main from './page/MainPage';
import Login from './page/LoginPage';
import Signup from './page/SignupPage';
import PostForm from './page/PostFormPage';
import Post from './page/PostPage'
import PostDetail from './page/PostDetailPage';

import MyPage from './page/MyPagePage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
          <Routes>
            <Route path ="/" element={<Main />} />
            <Route path ="/login" element={<Login />} />
            <Route path ="/signup" element={<Signup />} />
            <Route path ="/post" element={<Post />} />
            <Route path ="/postform" element={<PostForm />} />
            <Route path ="/postdetail" element={<PostDetail />} />
            <Route path ="/mypage" element={<MyPage />} />
          </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
