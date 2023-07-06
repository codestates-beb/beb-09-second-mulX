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

npm start // express 서버 시작

API Docs
https://flicker-wealth-b5d.notion.site/Prj-2-Incentive-Token-Community-df031b0a2d034ee796d141b40fc127b6?pvs=4

## Smart contract: hardhat

npm install // 필수 모듈 설치

// hardhat
// 참고: npx hardhat (JavaScript projet 선택) -> project 생성
// hardhat, @openzepplin/contracts, dotenv, ethers

ganache 실행 // hardhat.config.js 에 ganache network 환경설정

npx hardhat run scrips/deploy.js --network ganache

// ganache ERC20, 721 계약 배포
// smartContract 폴더 내에서 실행
