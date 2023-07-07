const { ethers } = require('ethers');
const MulX20 = require('../../smartContract/artifacts/contracts/MulX20.sol/MulX20.json');
const MulX721 = require('../../smartContract/artifacts/contracts/MulX721.sol/MulX721.json');

const serverPrivateKey =
  '0x9284fa0469fb2025beefc13a29a1ebfdd505d84ead5a3734bbeb6c23b6db706f';

const provider = new ethers.JsonRpcProvider('http://localhost:8545');
const wallet = new ethers.Wallet(serverPrivateKey, provider);

//console.log(wallet);

async function tokenDeploy() {
  const nonce = await provider.getTransactionCount(wallet.address);
  console.log(`Nonce: ${nonce}`);

  // 이전에 배포한 스마트 컨트랙트의 nonce 값을 가져옵니다.
  const tokenNonce = await provider.getTransactionCount(
    'PREVIOUSLY_DEPLOYED_CONTRACT_ADDRESS'
  );
  console.log(`Token nonce: ${tokenNonce}`);

  // 현재 nonce 값이 이전 nonce 값보다 1 큰 경우에만 스마트 컨트랙트를 배포합니다.
  if (nonce === tokenNonce + 1) {
    const tokenContractFactory = new ethers.ContractFactory(
      Token.abi,
      Token.bytecode,
      wallet
    );
    const tokenContract = await tokenContractFactory.deploy();
    console.log(`Token deployed to:`, tokenContract.target);
  } else {
    console.log('Token already deployed');
  }
}

//deploy(MulX20, ['My MulX20', 'MULX']);
//deploy(MulX721, []);

async function deploy() {
  await tokenDeploy(MulX20, ['My MulX20', 'MULX']);
  await tokenDeploy(MulX721, []);
}

deploy().catch((error) => {
  console.error(error);
  process.exit(1);
});
//module.exports = deploy;
