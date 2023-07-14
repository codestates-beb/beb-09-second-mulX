# beb-09-second-03

# 환경설정

## Back-end: express, sequlize

npm install // 필수 모듈 설치

npm install -g sequelize-cli // 전역설치 후 사용

// cors, dotenv, express, mysql2, nodemon, sequelize, sequelize-cli
// 참고: express [프로젝트 명], sequelize-cli init 으로 초기 setting

env.sample -> env 환경설정

MySQL 실행

npx sequelize-cli db:create // MySQL database 생성 (mulX)
npx sequelize-cli db:migrate // MySQL table update (DB Schema 반영)

API Docs
https://flicker-wealth-b5d.notion.site/Prj-2-Incentive-Token-Community-df031b0a2d034ee796d141b40fc127b6?pvs=4

## Smart contract: hardhat

npm install // 필수 모듈 설치

// hardhat
// 참고: npx hardhat (JavaScript projet 선택) -> project 생성
// hardhat, @openzepplin/contracts, dotenv, ethers

ganache 실행
// hardhat.config.js 에 ganache network 환경설정
// ganache 자동생성주소의 첫번째 주소의 개인키를 server 폴더의 .env file에 기입
// SERVER_PRIVATE_KEY

npx hardhat run scrips/deploy.js --network ganache

// ganache ERC20, 721 계약 배포
// smartContract 폴더 내에서 실행

//계약배포 후 터미널의 Contract 주소를 server 폴더의 .env file에 기입
//MULX20_CONTRACT_ADDRESS, MULX721_CONTRACT_ADDRESS

npm start // express 서버 시작

---

Sepolia testnet 배포

smartContract 폴더에 있는 .env file 에 기입

PRIVATE_KEY='' // Sepolia ETH 잔고가 있어야 배포가능
INFURA_API_KEY=''

hardhat.config.js 안에 networks 에 sepolia 환경 기입

npx hardhat run scrips/deploy.js --network sepolia

//계약배포 후 터미널의 Contract 주소를 server 폴더의 .env file에 기입
// MULX20_CONTRACT_ADDRESS, MULX721_CONTRACT_ADDRESS, INFURA_API_KEY, Contract owner 지갑 private_key
// 현재 코드는 서버에서 all that node api 사용
