const { ethers } = require('hardhat');

async function mulXToken() {
  const MulX20 = await ethers.getContractFactory('MulX20');
  const mulX20 = await MulX20.deploy('My MulX20', 'MULX');

  console.log('MulX20 Token deployed to:', mulX20.target);
}

async function mulXNFT() {
  const MulX721 = await ethers.getContractFactory('MulX721');
  const mulX721 = await MulX721.deploy({ value: ethers.parseEther('1') });

  console.log('MulX721 deployed to:', mulX721.target);
}

async function deploy() {
  await mulXToken();
  await mulXNFT();

  console.log('MulXToken and MulX721 deployed successfully!');
  process.exit(0);
}

deploy().catch((error) => {
  console.error(error);
  process.exit(1);
});
