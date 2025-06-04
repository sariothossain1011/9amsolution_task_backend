const express = require("express");
const { Registration, Login, GetUserInfo } = require("../controllers/UserController");
const { RequireSignIn } = require("../middleware/Middleware");
const router = express.Router();


router.post("/sign-up", Registration);
router.post("/sign-in", Login);
router.get("/user-info",RequireSignIn,GetUserInfo);


module.exports = router;