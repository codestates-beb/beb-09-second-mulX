require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.10',
  networks: {
    ganache: {
      url: 'http://127.0.0.1:8545',
      network_id: '*',
    },
  },
};
