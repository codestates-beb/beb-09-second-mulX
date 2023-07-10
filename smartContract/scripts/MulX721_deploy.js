const { ethers } = require('hardhat');

async function main() {
  const MulX721 = await ethers.getContractFactory('MulX721');
  const mulX721 = await MulX721.deploy();

  console.log('MulX721 deployed to:', mulX721.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
