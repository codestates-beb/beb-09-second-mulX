const { Posts, Users, Imgs } = require('../models');
const Sequelize = require('sequelize');
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = {
  post: async (req, res) => {
    upload.single('post_img')(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'Failed to upload file.' });
      }

      const { email, title, content } = req.body;
      const image = req.file;

      //console.log(req.body);
      //console.log(req.file);

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

        const img = await Imgs.create({
          post_img: image.buffer,
          post_img_Type: image.mimetype,
          post_id: post.post_id,
          user_id: user.user_id,
        });

        res.status(201).send({
          message: 'Success write post',
          data: {
            postId: post.post_id,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          },
        });
        //res.status(200).json({ message: 'Success write post' });
      } catch (err) {
        res.status(500).send({ error: 'Failed to write Post' });
      }
    });
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

      //console.log(posts);

      const responseData = await Promise.all(
        posts.map(async (post) => {
          const imgs = await Imgs.findAll({ where: { post_id: post.post_id } });

          //console.log(imgs);

          const imgData = imgs.map((img) => {
            return {
              post_id: img.post_id,
              post_img: img.post_img,
              post_img_Type: img.post_img_Type,
            };
          });

          return {
            post_id: post.post_id,
            title: post.title,
            content: post.content,
            email: post.User.email,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            post_img_Type: imgData[0].post_img_Type,
            post_img: imgData[0].post_img,
          };
        })
      );
      res.status(200).json(responseData);
      //res.status(200).json({ message: 'Success get all posts' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to get all posts' });
    }
  },

  findByIdPost: async (req, res) => {
    try {
      const { post_id } = req.params;

      const post = await Posts.findOne({
        where: { post_id: post_id },
        include: [{ model: Users, attributes: ['email'] }],
      });

      //console.log(post);

      if (!post) {
        return res.status(404).json({
          message: 'Post not found',
        });
      }

      const imgs = await Imgs.findOne({ where: { post_id: post.post_id } });

      //console.log(imgs);

      const responseData = {
        post_id: post.post_id,
        title: post.title,
        content: post.content,
        email: post.User.email,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        post_img_Type: imgs.post_img_Type,
        post_img: imgs.post_img,
      };

      res.status(200).json(responseData);
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
      //console.log(user);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const posts = await Posts.findAll({
        where: { user_id: user.user_id },
        order: [['createdAt', 'DESC']],
      });

      const responseData = await Promise.all(
        posts.map(async (post) => {
          const imgs = await Imgs.findAll({ where: { post_id: post.post_id } });

          const imgData = imgs.map((img) => {
            return {
              post_id: img.post_id,
              post_img: img.post_img,
              post_img_Type: img.post_img_Type,
            };
          });

          return {
            post_id: imgData[0].post_id,
            title: post.title,
            content: post.content,
            email: user.email,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            post_img_Type: imgData[0].post_img_Type,
            post_img: imgData[0].post_img,
          };
        })
      );

      res.status(200).json(responseData);
      //res.status(200).json({ message: 'Success get all posts' });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },

  update: async (req, res) => {
    upload.single('post_img')(req, res, async (err) => {
      if (err) {
        //console.log(err);
        return res.status(400).json({ message: 'Failed to upload file.' });
      }

      const { post_id } = req.params;
      const { email, title, content } = req.body;
      const image = req.file;

      const post = await Posts.findOne({
        where: { post_id: post_id },
        include: [{ model: Users, attributes: ['email'] }],
      });

      if (!post) {
        return res.status(404).json({
          message: 'Post not found',
        });
      }

      //console.log(image);

      try {
        const user = await Users.findOne({ where: { email } });

        if (user.user_id !== post.user_id) {
          return res.status(404).json({ message: 'Unauthorized' });
        }

        const [_, updatedPost] = await Posts.update(
          {
            title,
            content,
          },
          {
            where: { post_id },
            returning: true,
          }
        );

        const resPost = await Posts.findOne({ where: { post_id } });

        const responseData = {
          post_id: resPost.post_id,
          email: user.email,
          title: resPost.title,
          content: resPost.content,
          createdAt: resPost.createdAt,
          updatedAt: resPost.updatedAt,
        };

        if (image) {
          await Imgs.update(
            {
              post_img: image.buffer,
              post_img_Type: image.mimetype,
              post_id: post.post_id,
              user_id: user.user_id,
            },
            {
              where: { post_id },
              returning: true,
            }
          );
        }

        const resPostImg = await Imgs.findOne({ where: { post_id } });

        responseData.post_img_Type = resPostImg.post_img_Type;
        responseData.post_img = resPostImg.post_img;

        res.status(200).json({ post: responseData });
        //res.status(200).json('test');
      } catch (err) {
        res.status(500).json({ error: 'Failed to update post' });
      }
    });
  },
};
