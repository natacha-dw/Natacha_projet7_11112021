const { Comment, User } = require("../models");
//----------------------------------------------------------------------------------------------------------------------
//CREATECOMMENT
exports.createComment = (req, res, next) => {
  if (!req.body.comment) {
    return res.status(400).json({ error: "Merci de remplir le champ." });
  }
  Comment.create({
    idUser: res.locals.userId,
    idPost: req.params.postId,
    comment: req.body.comment,
  })
    .then(() => res.status(200).json({ message: "Commentaire envoyé !" }))
    .catch((error) => res.status(500).json(error));
};
//----------------------------------------------------------------------------------------------------------------------
exports.getAllComment = (req, res, next) => {
  Comment.findAll({
    where: { idPost: req.params.postId },
    order: [["updatedAt", "DESC"]],
    include: [{ model: User, attributes: ["firstName", "lastName", "id"] }],
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
//----------------------------------------------------------------------------------------------------------------------
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
    if (!comment) {
      res.status(404).json({
        message: "comment not found",
      });
      return;
    }

    if (comment.idUser !== res.locals.userId && !res.locals.isAdmin) {
      res.status(403).json({
        message: "Not authorized",
      });
      return;
    }
    await comment.destroy();
    res.status(200).json({
      message: "comment deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};