
const user= require("../controller/admincontroller")
const express= require("express");
const router=express.Router()
const auth= require("../middleware/adminSession")


router.get("/",(req, res, next)=>{
    
    res.render("base.ejs")
    next();
})
router.post("/admin",user.insertUser);

router.get("/main",auth.isLogout,user.admin);

router.post('/admindashboard',user.admindashboard);
router.get('/admindashboard',auth.isLogin,user.welcome)

router.get('/welcome',auth.isLogin,user.welcome);
router.post("/edit",user.edituser)
router.get("/edit",user.edit)
router.get("/delete",user.delete)
router.get("/asscending",user.assendingorder)
router.get("/descending", user.descendingorder)
router.get("/search",user.search)
router.get("/destroysession",user.sessiondestroy)






module.exports=router;
