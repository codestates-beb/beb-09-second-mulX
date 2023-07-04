module.exports = {
  signup: (req, res) => {
    res.json({
      message: 'Signup',
      data: {
        userId: req.body.userId,
        nickname: req.body.nickname,
        address: '0xd46781DaB588d6E372a24fef318D9b5E09d9011',
      },
    });
  },
  login: (req, res) => {
    res.json({
      message: 'Login',
      data: {
        userId: req.body.userId,
        nickname: req.body.nickname,
        address: '0xd46781DaB588d6E372a24fef318D9b5E09d9011',
      },
    });
  },
};
