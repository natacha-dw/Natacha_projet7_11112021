const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.get("/:postId/comments", auth, commentCtrl.getAllComment);
router.post("/:postId/comment/", auth, commentCtrl.createComment);
router.delete("/:postId/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;