'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // Users.belongsTo(models.Posts, {
      //   foreignKey: 'user_id',
      //   as: 'posts',
      // });
      // Users.belongsTo(models.Nfts, {
      //   foreignKey: 'user_id',
      //   as: 'NFTs',
      // });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      token_amount: DataTypes.INTEGER,
      eth_amount: DataTypes.INTEGER,
      profile_img: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: 'Users',
      timestamps: true,
    }
  );
  return Users;
};
