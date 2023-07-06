const { Users } = require('../models');
const { ethers } = require('ethers');

module.exports = {
  signup: async (req, res) => {
    const { email, password, nickname } = req.body;

    try {
      let user = await Users.findOne({ where: { email: email } });

      if (user) {
        res.status(409).json({
          error: 'User already exists',
        });
      } else {
        const newWallet = ethers.Wallet.createRandom();
        console.log(newWallet.mnemonic.phrase);

        user = await Users.create({
          email: email,
          password: password,
          nickname: nickname,
          address: newWallet.address,
          privatekey: newWallet.privateKey,
          mnemonic: newWallet.mnemonic.phrase,
        });

        res.status(200).json({
          message: 'Signup',
          data: {
            email: user.email,
            nickname: user.nickname,
            address: user.address,
            token_amount: user.token_amount,
            eth_amount: user.eth_amount,
            createdAt: user.createdAt,
          },
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'The request message is invalid.' });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await Users.findOne({ where: { email: email } });

      if (user) {
        if (user.password === password) {
          res.status(200).json({
            message: 'Login',
            data: {
              nickname: user.nickname,
              address: user.address,
              token_amount: user.token_amount,
              eth_amount: user.eth_amount,
            },
          });
        } else {
          res.status(401).json({
            error: 'Password is incorrect',
          });
        }
      } else {
        res.status(404).json({
          error: 'User does not exist',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'The request message is invalid.' });
    }
  },
};
