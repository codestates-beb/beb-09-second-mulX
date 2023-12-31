const { Users } = require('../models');
const { ethers } = require('ethers');

const MulX20 = require('../../smartContract/artifacts/contracts/MulX20.sol/MulX20.json');

require('dotenv').config();

//const provider = new ethers.JsonRpcProvider(process.env.GANACHE_URL);
const provider = new ethers.JsonRpcProvider(process.env.ALLTHATNODE_URL);

module.exports = {
  faucet: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await Users.findOne({ where: { email: email } });
      const address = user.address;

      const ServerPrivateKey = process.env.SERVER_PRIVATE_KEY;
      const ServerWallet = new ethers.Wallet(ServerPrivateKey, provider);

      const tx = {
        to: address,
        value: ethers.parseEther('0.1'),
      };
      const txResponse = await ServerWallet.sendTransaction(tx);
      const balanceOfEth = ethers.formatEther(await provider.getBalance(address));

      const [updatedRows] = await Users.update(
        { eth_amount: balanceOfEth },
        { where: { email: email } }
      );

      res.status(200).json({
        message: 'Faucet successfully completed.',
        data: {
          address: address,
          txHash: txResponse.hash,
          balance: balanceOfEth,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'The request message is invalid.' });
    }
  },

  balanceOfEth: async (req, res) => {
    const { address } = req.params;

    try {
      res.status(200).json({
        message: 'Balance of ETH',
        data: {
          balance: ethers.formatEther(await provider.getBalance(address)),
        },
      });
    } catch (err) {
      res.status(400).json({ error: 'The request message is invalid.' });
    }
  },

  token: async (req, res) => {
    const { email, tokenAmount } = req.body;

    try {
      const user = await Users.findOne({ where: { email: email } });
      const address = user.address;

      const ServerPrivateKey = process.env.SERVER_PRIVATE_KEY;
      const ServerWallet = new ethers.Wallet(ServerPrivateKey, provider);

      const MulX20ContractAddress = process.env.MULX20_CONTRACT_ADDRESS;

      const MulX20Contract = new ethers.Contract(
        MulX20ContractAddress,
        MulX20.abi,
        ServerWallet
      );
      //console.log(MulX20Contract);

      const tx = await MulX20Contract.transfer(
        address,
        ethers.parseUnits(tokenAmount, 18)
      );
      const txResponse = await tx.wait();
      const balanceOfToken = await MulX20Contract.balanceOf(address);
      const balanceOfTokenEther = ethers.formatEther(balanceOfToken);

      const [updatedRows] = await Users.update(
        { token_amount: balanceOfTokenEther },
        { where: { email: email } }
      );

      res.status(200).json({
        message: 'Token successfully rewarded.',
        data: {
          txHash: txResponse.hash,
          balance: balanceOfTokenEther,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'The request message is invalid.' });
    }
  },

  balanceOfToken: async (req, res) => {
    const { address } = req.params;

    try {
      const ServerPrivateKey = process.env.SERVER_PRIVATE_KEY;
      const ServerWallet = new ethers.Wallet(ServerPrivateKey, provider);

      const MulX20ContractAddress = process.env.MULX20_CONTRACT_ADDRESS;

      const MulX20Contract = new ethers.Contract(
        MulX20ContractAddress,
        MulX20.abi,
        ServerWallet
      );

      const balanceOfToken = await MulX20Contract.balanceOf(address);
      const balanceOfTokenEther = ethers.formatEther(balanceOfToken);

      res.status(200).json({
        message: 'Balance of MULX',
        data: {
          balance: balanceOfTokenEther,
        },
      });
    } catch (err) {
      res.status(400).json({ error: 'The request message is invalid.' });
    }
  },

  transfer: async (req, res) => {
    const { email, toAddress, amountSendToken } = req.body;

    try {
      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        return res.status(401).json({ error: 'User does not exist.' });
      }

      const UserWallet = new ethers.Wallet(user.privatekey, provider);
      const MulX20ContractAddress = process.env.MULX20_CONTRACT_ADDRESS;

      const MulX20Contract = new ethers.Contract(
        MulX20ContractAddress,
        MulX20.abi,
        UserWallet
      );

      const amountWei = ethers.parseEther(amountSendToken);
      //console.log(amountWei);
      const txResponse = await MulX20Contract.transfer(toAddress, amountWei);
      //console.log(txResponse);
      const balanceOfTokenWei = await MulX20Contract.balanceOf(user.address);
      const balanceOfTokenEther = ethers.formatEther(balanceOfTokenWei);

      res.status(200).json({
        message: 'Token transfer successful',
        data: {
          toAddress: toAddress,
          txHash: txResponse.hash,
          balance: balanceOfTokenEther,
        },
      });
      //res.status(200).json('test');
    } catch (err) {
      res.status(400).json({ error: 'The request message is invalid.' });
    }
  },
};
