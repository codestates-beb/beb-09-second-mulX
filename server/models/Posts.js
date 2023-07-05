'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.hasMany(models.Imgs, { foreignKey: 'post_id' });
      Posts.belongsTo(models.Users, { foreignKey: 'user_id' });
    }
  }
  Posts.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Posts',
      timestamps: true,
    }
  );
  return Posts;
};
