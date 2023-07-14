'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Posts, { foreignKey: 'user_id' });
      Users.hasMany(models.Nfts, { foreignKey: 'user_id' });
      Users.belongsTo(models.Imgs, { foreignKey: 'user_id' });
    }
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      privatekey: DataTypes.STRING,
      mnemonic: DataTypes.STRING,
      token_amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      eth_amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Users',
      timestamps: true,
    }
  );
  return Users;
};
