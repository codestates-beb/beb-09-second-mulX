const { ethers } = require('hardhat');

async function main() {
  const MulX20 = await ethers.getContractFactory('MulX20');
  const mulX20 = await MulX20.deploy('My MulX20', 'MULX');

  console.log('MulX20 Token deployed to:', mulX20.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
