const session = require("express-session");
const user= require("../models/user_model");


module.exports={
    userpage: async (req, res) => {
        try {
            const email = req.body.email;
            const pass = req.body.pass;
            const users = await user.find({});
            const matchingUser = users.find(user => user.email === email && user.password === pass);

            if (matchingUser) {
                req.session.email = matchingUser.email;
                console.log(req.session);
                const username = matchingUser.name;
                console.log(username);

                // Redirect only if matchingUser and req.session.email exist
                if (req.session.email) {
                    req.session.save()
                    return res.redirect("/login");
                }
            }

            // Render login page with an error message
            res.render("user/userlogin", { message: "Credentials not found" });
        } catch (error) {
            console.log("Error:", error);
            res.render("user/userlogin", { message: "Credentials not found" });
        }
    },
    
    userdashboard:async(req,res)=>{
        if(!req.session.email){
            res.redirect("/login1")
        }else{
        res.render("user/userpage",{username:null})
        }
    },  
    loadlogin:async(req,res)=>{
        res.render("user/userlogin",{message:null})
    },


    // session  destroyed.....................................
    login:async(req,res)=>{
        req.session.destroy()
       
        console.log(req.session)
        res.redirect("/login1")
    },

}

