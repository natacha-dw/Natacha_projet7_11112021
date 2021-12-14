const { Model } = require("sequelize");
module.exports = (sequelize, dataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          name: "idUser",
          allowNull: false,
        },
      });
      models.Comment.belongsTo(models.Post, {
        foreignKey: {
          name: "idPost",
          allowNull: false,
        },
      });
    }
  }
  Comment.init(
    {
      idUser: dataTypes.INTEGER,
      idPost: dataTypes.INTEGER,
      comment: dataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};