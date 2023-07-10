'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Imgs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Imgs.belongsTo(models.Users, {
        foreignKey: { name: 'users_id', allowNull: false },
        onDelete: 'CASCADE',
      });
    }
  }
  Imgs.init(
    {
      img_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      profile_img: DataTypes.STRING,
      post_img: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Imgs',
      timestamps: true,
    }
  );
  return Imgs;
};
