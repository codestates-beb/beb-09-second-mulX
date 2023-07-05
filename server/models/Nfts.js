'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Nfts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nfts.belongsTo(models.Users, {
        foreignKey: { name: 'users_id', allowNull: false },
        onDelete: 'CASCADE',
      });
    }
  }
  Nfts.init(
    {
      nft_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      token_id: DataTypes.INTEGER,
      txhash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Nfts',
    }
  );
  return Nfts;
};
