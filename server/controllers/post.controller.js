const { Posts, Users, Imgs } = require('../models');
const Sequelize = require('sequelize');
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = {
  post: async (req, res) => {
    upload.single('post_img')(req, res, async (err) => {
      if (err) {
        //console.log(err);
        return res.status(400).json({ message: 'Failed to upload file.' });
      }

      const { email, title, content } = req.body;
      const image = req.file;

      let base64Image;
      if (image) {
        base64Image = image.buffer.toString('base64');
      }

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

        if (image) {
          const img = await Imgs.create({
            post_img: base64Image,
            post_img_Type: image.mimetype,
            post_id: post.post_id,
            user_id: user.user_id,
          });
        }

        res.status(201).send({
          message: 'Success write post',
          data: {
            postId: post.post_id,
            nickname: user.nickname,
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
            attributes: ['email', 'nickname'],
            where: { user_id: Sequelize.col('Posts.user_id') },
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      //console.log(posts);

      const responseData = await Promise.all(
        posts.map(async (post) => {
          const imgs = await Imgs.findAll({ where: { post_id: post.post_id } });

          const imgData = imgs.map((img) => {
            const dataUrl = `data:${img.post_img_Type};base64,${img.post_img}`;

            return {
              post_id: img.post_id,
              post_img: dataUrl,
              post_img_Type: img.post_img_Type,
            };
          });

          const postImg = imgData.length > 0 ? imgData[0].post_img : null;
          const postImgType = imgData.length > 0 ? imgData[0].post_img_Type : null;

          return {
            post_id: post.post_id,
            title: post.title,
            content: post.content,
            email: post.User.email,
            nickname: post.User.nickname,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            post_img_Type: postImgType,
            post_img: postImg,
          };
        })
      );
      res.status(200).json(responseData);
      //res.status(200).json({ message: 'Success get all posts' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to get all posts' });
    }
  },

  findByIdPost: async (req, res) => {
    try {
      const { post_id } = req.params;

      const post = await Posts.findOne({
        where: { post_id: post_id },
        include: [{ model: Users, attributes: ['email', 'nickname'] }],
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
        nickname: post.User.nickname,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      if (imgs) {
        const dataUrl = `data:${imgs.post_img_Type};base64,${imgs.post_img}`;
        responseData.post_img_Type = imgs.post_img_Type;
        responseData.post_img = dataUrl;
      }

      res.status(200).json(responseData);
    } catch (error) {
      //console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },

  findByEmail: async (req, res) => {
    try {
      const { email } = req.params;

      const user = await Users.findOne({ where: { email: email } });
      console.log(user);

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
            const dataUrl = `data:${img.post_img_Type};base64,${img.post_img}`;

            return {
              post_id: img.post_id,
              post_img: dataUrl,
              post_img_Type: img.post_img_Type,
            };
          });

          const postImg = imgData.length > 0 ? imgData[0].post_img : null;
          const postImgType = imgData.length > 0 ? imgData[0].post_img_Type : null;

          return {
            post_id: post.post_id,
            title: post.title,
            content: post.content,
            email: user.email,
            nickname: user.nickname,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            post_img_Type: postImgType,
            post_img: postImg,
          };
        })
      );

      res.status(200).json(responseData);
      //res.status(200).json({ message: 'Success get all posts' });
    } catch (error) {
      //console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },

  findByNickname: async (req, res) => {
    try {
      const { nickname } = req.body;

      const user = await Users.findOne({ where: { nickname: nickname } });

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
            const dataUrl = `data:${img.post_img_Type};base64,${img.post_img}`;

            return {
              post_id: img.post_id,
              post_img: dataUrl,
              post_img_Type: img.post_img_Type,
            };
          });

          const postImg = imgData.length > 0 ? imgData[0].post_img : null;
          const postImgType = imgData.length > 0 ? imgData[0].post_img_Type : null;

          return {
            post_id: post.post_id,
            title: post.title,
            content: post.content,
            email: user.email,
            nickname: user.nickname,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            post_img_Type: postImgType,
            post_img: postImg,
          };
        })
      );

      res.status(200).json(responseData);
      //res.status(200).json({ message: 'Success get all posts' });
    } catch (error) {
      //console.error(error);
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

      let base64Image;
      if (image) {
        base64Image = image.buffer.toString('base64');
      }

      const post = await Posts.findOne({
        where: { post_id: post_id },
        include: [{ model: Users, attributes: ['email', 'nickname'] }],
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
          title: resPost.title,
          content: resPost.content,
          email: user.email,
          nickname: user.nickname,
          createdAt: resPost.createdAt,
          updatedAt: resPost.updatedAt,
        };

        if (image) {
          await Imgs.update(
            {
              post_img: base64Image,
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
        const dataUrl = `data:${resPostImg.post_img_Type};base64,${resPostImg.post_img}`;

        responseData.post_img_Type = resPostImg.post_img_Type;
        responseData.post_img = dataUrl;

        res.status(200).json({ post: responseData });
        //res.status(200).json('test');
      } catch (err) {
        res.status(500).json({ error: 'Failed to update post' });
      }
    });
  },
};
