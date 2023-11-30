


let isLogin=async(req, res, next)=>{

    if(req.session.isAuth){
        next()

    }else{
        res.redirect("/main")
    }
}

let isLogout = async(req, res, next)=>{
    if(req.session.isAuth){
        res.redirect("/admindashboard")
    }else{
        next()
    }
}
module.exports={isLogin, isLogout}