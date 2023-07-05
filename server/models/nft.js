'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nft.belongsTo(models.Users, {
        foreignKey: { name: 'users_id', allowNull: false },
        onDelete: 'CASCADE',
      });
    }
  }
  Nft.init(
    {
      users_id: DataTypes.INTEGER,
      token_id: DataTypes.INTEGER,
      txhash: DataTypes.STRING,
      token_uri: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Nft',
    }
  );
  return Nft;
};
