const { Posts, Users } = require('../models');
const Sequelize = require('sequelize');

module.exports = {
  post: async (req, res) => {
    const { email, title, content } = req.body;

    try {
      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const post = await Posts.create({
        user_id: user.user_id,
        title,
        content,
      });

      res.status(201).send({
        data: {
          postId: post.post_id,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
        message: 'Success write post',
      });
    } catch (err) {
      res.status(500).send({ error: 'Failed to write Post' });
    }
  },

  findAllPost: async (req, res) => {
    try {
      const posts = await Posts.findAll({
        include: [
          {
            model: Users,
            attributes: ['email'],
            where: { user_id: Sequelize.col('Posts.user_id') },
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      const modifiedPosts = posts.map((post) => {
        const { user_id, User, ...rest } = post.dataValues;
        return { ...rest, email: post.User.email };
      });

      res.status(200).json({ message: 'Success get all posts', posts: modifiedPosts });
    } catch (err) {
      res.status(500).json({ error: 'Failed to get all posts' });
    }
  },

  findByIdPost: async (req, res) => {
    try {
      const { post_id } = req.params;

      const post = await Posts.findOne({ where: { post_id: post_id } });

      console.log(post);

      if (!post) {
        return res.status(404).json({
          message: 'Post not found',
        });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },

  findByEmail: async (req, res) => {
    try {
      const { email } = req.params;

      const user = await Users.findOne({ where: { email: email } });

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      const posts = await Posts.findAll({
        where: { user_id: user.user_id },
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },

  update: async (req, res) => {
    const { post_id } = req.params;
    const { email, title, content } = req.body;

    try {
      let post = await Posts.update(
        {
          email: email,
          title: title,
          content: content,
        },
        { where: { post_id: post_id } }
      );

      post = await Posts.findOne({ where: { post_id: post_id }, include: Users });

      const { user_id, User, ...rest } = post.dataValues;
      const user = await Users.findOne({ where: { user_id } });
      const modifiedPost = { ...rest, email: user.email };

      res.status(200).json({ post: modifiedPost });
    } catch (err) {
      res.status(500).json({ error: 'Failed to get post' });
    }
  },
};
