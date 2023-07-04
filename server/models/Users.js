'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      Users.belongsTo(models.Posts, {
        foreignKey: 'users_id',
      });
      Users.belongsTo(models.Nfts, {
        foreignKey: 'users_id',
      });
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
