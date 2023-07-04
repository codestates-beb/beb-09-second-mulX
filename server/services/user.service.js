const db = require('../db');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

export default {
  findAllUser: async () => {
    const users = await db.User.findAll({ raw: true });
    return users;
  },
  findUserById: async (id) => {
    const user = await db.User.findAll({
      raw: true,
      where: { id: id },
    });
    return user;
  },
  findUserByNickname: async (nickname) => {
    const user = await db.User.findAll({
      raw: true,
      where: { nickname: nickname },
    });
  },
  createUser: async (userObj) => {
    const newAddress = await web3.eth.personal.newAccount(userObj.password);
    const user = await db.User.create({
      loginId: userObj.loginId,
      password: userObj.password,
      nickname: userObj.nickname,
      role: userObj.role,
    });

    // await db.Wallet.create({
    //   address: newAddress,
    //   id: user.id,
    // });
  },
};
