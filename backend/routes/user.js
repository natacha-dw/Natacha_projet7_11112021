const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth"); // Crée un token d'identification
const multer = require("../middleware/multer-config"); // Permet d'envoyer un fichier dans la requête

// ROUTE
router.post("/signup", userCtrl.signup);//enregistrer un nouvel utilisateur
router.post("/login", userCtrl.login);

router.get("/profile/:id", auth, userCtrl.getOneProfile);//on declanche dans le dossier UserControler la fonction getOne profile.
router.get("/profile/:id/posts", auth, userCtrl.getAllPostProfile);
router.put("/profile/:id", auth, userCtrl.modifyProfile);
router.delete("/profile/:id", auth, userCtrl.deleteProfile);

module.exports = router;