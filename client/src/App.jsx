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
import Nft from './components/nft/Nft';
import NftDetail from './components/nft/NftDetail';
import Faucet from './components/faucet/Faucet';
import Transfer from './components/transfer/Transfer';


function Layout() {
  const location = useLocation();
  const [page, setPage]  = useState('orange');

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
      setPage('orange');
    } else if (location.pathname === '/post' || location.pathname === '/postdetail' || location.pathname === '/nft' || location.pathname === '/nftdetail' || location.pathname === '/mypage') {
      setPage('white');
    } else if(location.pathname === "/postform" ||location.pathname === "/mintnft"){
      setPage('black')
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
        <Route path="/postdetail/:id" element={<PostDetail />} />
        <Route path ="/mypage" element={<MyPage />} />
        <Route path ="/mintnft" element={<MintNFT />} />
        <Route path ="/nft" element={<Nft />} />
        <Route path ="/nftdetail" element={<NftDetail />} />
        <Route path ="/faucet" element={<Faucet />} />
        <Route path ="/transfer" element={<Transfer />} />
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
