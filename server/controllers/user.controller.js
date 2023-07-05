const { Users } = require('../models');

module.exports = {
  signup: async (req, res) => {
    const { userId, password, nickname } = req.body;

    try {
      const user = await Users.create({
        user_id: userId,
        password: password,
        nickname: nickname,
        address: `0x${Math.random().toString(16).slice(2, 42)}`,
      });

      res.status(200).json({
        message: 'Signup',
        data: {
          userId: user.user_id,
          nickname: user.nickname,
          address: user.address,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: '유효하지 않은 요청 메시지입니다' });
    }
  },
  login: async (req, res) => {
    const { userId, password } = req.body;

    try {
      const user = await Users.findOne({
        where: {
          userId,
          password,
        },
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid User' });
      }

      res.json({
        message: 'Login',
        data: {
          userId: user.userId,
          nickname: user.nickname,
          address: user.address,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
};
