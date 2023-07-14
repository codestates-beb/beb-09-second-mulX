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
      Imgs.belongsTo(models.Posts, { foreignKey: 'post_id' });
      Imgs.belongsTo(models.Users, { foreignKey: 'user_id' });
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
      profile_img: DataTypes.BLOB('long'),
      profile_img_Type: DataTypes.STRING,
      post_img: DataTypes.BLOB('long'),
      post_img_Type: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Imgs',
      timestamps: false,
    }
  );
  return Imgs;
};
