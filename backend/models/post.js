const { Model } = require("sequelize");
module.exports = (sequelize, dataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          name: "idUser",
          allowNull: false,
        },
      });
      models.Post.hasMany(models.Comment, {
        foreignKey: {
          name: "idPost",
          allowNull: false,
        },
      onDelete: "cascade",
      hooks: true, 
      });
    }
  }

  Post.init(
    {
      title: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      content: dataTypes.TEXT,
      image: dataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};