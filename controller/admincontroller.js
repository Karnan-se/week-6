const { error } = require("console");
const user= require("../models/user_model");
const adminUsername= "admin@123";
const adminPassword= "123";
// const auth =require("../middleware/session")
module.exports = {
     insertUser : async (req, res)=>{
    try {
        var newUser=new user({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,

        });

        await newUser.save();
        res.redirect("/main")
        console.log("username saved");
    } catch (error) {
        console.log(error+"error")       
    }
},


// ..............................................................................................................registration page above
// this is main route

admin:async(req,res)=>{
    res.render("admin/admin",{message:null})
        
    },

admindashboard : async (req,res)=>{
    try{
        let message= null;
    const admin = req.body.adminemail;
    console.log(admin);
    const Apass= req.body.adminpass;
    console.log(`${admin}, ${Apass}`)

    if(admin===adminUsername && Apass===adminPassword){
        req.session.isAuth=admin;
        console.log(req.session.isAuth+'is created session');
        if(req.session.isAuth){
         res.redirect("/welcome");
         return
        }

}else{
     message="Invalid email and password"
     res.render("admin/admin",{message})
    
}

    }catch (error) {
        console.error("an error occured",error);
        res.status(500).send("internal server error")
    }

},

    welcome:async(req,res)=>{
        const users= await user.find({});
         res.render('admin/admindash.ejs',{users})
    },

// ....................................adminPassword...............adminPassword...................................................adminPassword............adminPassword........
     edit:async (req,res)=>{
        try {
            const userId= req.query.userId;
            const users= await user.findById({_id:userId})
            console.log(userId);
            console.log(users);
            res.render("admin/edit.ejs",{users:users})
        } catch (error) {
            console.log(error.message)
            
        }

     },
     edituser:async(req, res)=>{
        try {
            const userId= req.query.userId;
            const users= await user.updateOne({_id:userId},{$set:{name:req.body.name, email:req.body.email}});
            res.redirect("/admindashboard")
    
            
        } catch (error) {
            console.log(error.message);
        }
    
    },
    delete:async(req,res)=>{
        try {
             const userId = req.query.userId;
             const users= await user.deleteOne({_id:userId})
             res.redirect("/admindashboard")

            
        } catch (error) {
            console.log(`this is error ${error}`)
            
        }
    },

    assendingorder: async(req, res)=>{
        try {
           const ascended= await user.find().sort({name:1})
           res.render("admin/admindash",{users:ascended})
           console.log(ascended)
            
        } catch (error) {
            
        }


    },
    descendingorder: async(req, res)=>{
        try {
            const descended =await user.find().sort({name:-1})
            res.render("admin/admindash",{users:descended})
            console.log(descended)
            
        } catch (error) {
            
        }
    },
    search: async(req, res)=>{
        try {
            const searchpattern = req.query.search;
            console.log(searchpattern)
            const filtereduser = await user.find({name: {$regex: new RegExp(searchpattern, "i")}});
            res.render("admin/admindash",{users: filtereduser})
            
            
        } catch (error) {
            console.error(error)
            
        }
    },

    sessiondestroy: async (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("session destoyed");
                res.redirect("/main");
            }
        });
    }
}    
