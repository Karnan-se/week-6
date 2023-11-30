
// ith dashboardill
let islogin= async(req,res,next)=>{
    if(req.session.email){
        next()
    }else{
        res.redirect("/login1")

    } 

}
// loginpage
let islogout= async(req,res, next)=>{
    if(req.session.email){
        res.redirect("/login")
    }else{
        next()
    }
}
module.exports={islogin,islogout}