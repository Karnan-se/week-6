const user= require("../controller/usercontroller")
const auth= require("../middleware/usersession")
const express= require("express");
const router=express.Router();




router.post("/login",user.userpage)
router.get("/login",auth.islogin,user.userdashboard)
router.get("/login1",auth.islogout,user.loadlogin)
router.get("/logout",user.login)


module.exports=router;
