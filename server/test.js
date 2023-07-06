const ethers = require('ethers');

// Ganache 로컬 네트워크에 연결
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

// 첫 번째 계정의 주소 가져오기
provider.listAccounts().then((accounts) => {
  console.log(accounts[0]);
});
