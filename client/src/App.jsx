import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store'; // 변경된 import 구문

import Header from './components/Header';
import Main from './page/MainPage';
import Login from './page/LoginPage';
import Signup from './page/SignupPage';
import PostForm from './page/PostFormPage';
import Post from './page/PostPage'
import PostDetail from './page/PostDetailPage';
import MyPage from './page/MyPagePage';
import MintNFT from './page/MintNFTPage';


function Layout() {
  const location = useLocation();
  const [page, setPage]  = useState('orange');

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
      setPage('orange');
    } else if (location.pathname === '/post' || location.pathname === '/postdetail') {
      setPage('white');
    }
  }, [location]);

  return (
    <div>
      <Header path={page} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<Post />} />
        <Route path="/postform" element={<PostForm />} />
        <Route path="/postdetail" element={<PostDetail />} />
        <Route path ="/mypage" element={<MyPage />} />
        <Route path ="/mintnft" element={<MintNFT />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>

  );
}

export default App;
