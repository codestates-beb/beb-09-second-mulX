import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Main from './page/MainPage';
import Login from './page/LoginPage';
import Join from './page/JoinPage';

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<Main />} />
          <Route path ="/login" element={<Login />} />
          <Route path ="/join" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
