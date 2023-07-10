import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Main from './page/MainPage';
import Login from './page/LoginPage';
import Signup from './page/SignupPage';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
          <Routes>
            <Route path ="/" element={<Main />} />
            <Route path ="/login" element={<Login />} />
            <Route path ="/signup" element={<Signup />} />
          </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;