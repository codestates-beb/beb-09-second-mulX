function welcome(req, res) {
  res.json({ message: 'Welcome to the API home' });
}

module.exports = {
  welcome,
};
