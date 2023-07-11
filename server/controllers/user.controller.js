const { Users, Imgs } = require('../models');
const { ethers } = require('ethers');
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = {
  signup: async (req, res) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        //console.log(err);
        return res.status(400).json({ message: 'Failed to upload file.' });
      }

      const { email, nickname, password } = req.body;
      const image = req.file;

      //console.log(req.body);
      //console.log(req.file);

      try {
        let user = await Users.findOne({ where: { email: email } });
        if (user) {
          res.status(409).json({
            error: 'User already exists',
          });
        } else {
          const newWallet = ethers.Wallet.createRandom();
          //console.log(newWallet.mnemonic.phrase);
          user = await Users.create({
            email: email,
            password: password,
            nickname: nickname,
            address: newWallet.address,
            privatekey: newWallet.privateKey,
            mnemonic: newWallet.mnemonic.phrase,
          });

          const img = await Imgs.create({
            profile_img: image.buffer,
            profile_img_Type: image.mimetype,
            user_id: user.user_id,
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
    });
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
              email: user.email,
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

  findUser: async (req, res) => {
    const { email } = req.params;

    try {
      const user = await Users.findOne({ where: { email: email } });

      if (user) {
        const img = await Imgs.findOne({ where: { user_id: user.user_id } });

        console.log(img);

        const responseData = {
          email: user.email,
          nickname: user.nickname,
          address: user.address,
          token_amount: user.token_amount,
          eth_amount: user.eth_amount,
          createdAt: user.createdAt,
        };

        if (img) {
          responseData.profile_img_Type = img.profile_img_Type;
          responseData.profile_img = img.profile_img;
        }

        res.status(200).json({
          message: 'Find User',
          data: responseData,
        });
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
