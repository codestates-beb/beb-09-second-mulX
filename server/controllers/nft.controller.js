const { Nfts, Users } = require('../models');
const { ethers } = require('ethers');

const MulX721 = require('../../smartContract/artifacts/contracts/MulX721.sol/MulX721.json');

const provider = new ethers.JsonRpcProvider(process.env.GANACHE_URL);

module.exports = {
  mint: async (req, res) => {},
  findAllNfts: async (req, res) => {},
  findOwnerNfts: async (req, res) => {},
  buyNft: async (req, res) => {},
};
