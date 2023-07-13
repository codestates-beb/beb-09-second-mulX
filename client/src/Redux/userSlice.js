import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email:'',
    nickname: '',
    address: '',
    token_amount: '',
    eth_amount: '',
    profileImg : "",
    isLoggedIn: false,
  },
  reducers: {
    setLogout: (state) => {
      state.email = '';
      state.nickname = '';
      state.address = '';
      state.token_amount = '';
      state.eth_amount = '';
      state.isLoggedIn = false;
      console.log('실제 상태:', state.email, state.nickname, state.address, state.token_amount, state.eth_amount, state.isLoggedIn);
    },
    setLogin: (state, action) => {
      const { email, nickname, address, token_amount, eth_amount } = action.payload;
      state.email = email;
      state.nickname = nickname;
      state.address = address;
      state.token_amount = token_amount;
      state.eth_amount = eth_amount;
      state.isLoggedIn = true;
      console.log('실제 상태:', state.email, state.nickname, state.address, state.token_amount, state.eth_amount, state.isLoggedIn); // 실제 상태 출력 '_' 프로퍼티는 프록시 객체의 실제 상태를 나타내는 프로퍼티
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setTokenAmount: (state, action) => {
      state.token_amount = action.payload;
    },
    setEthAmount: (state, action) => {
      state.eth_amount = action.payload;
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload;
      //console.log('프로필 이미지 :', state.profileImg)
    },
  },
});

export const {
  setLogout,
  setLogin,
  setNickname,
  setAddress,
  setTokenAmount,
  setEthAmount,
  setProfileImg,
} = userSlice.actions;

export default userSlice.reducer;
