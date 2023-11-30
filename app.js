const express= require("express");
const router= require("./route/router")
const useroute= require("./route/useroute")
const mongoose= require("mongoose")
const session = require("express-session")
const nocache = require("nocache")
const app=express()
app.use(nocache())
app.set("view engine", "ejs")
app.set("views",__dirname+"/views")

app.use(express.static("public"))
app.use("/css",express.static("/public/css"))
app.use("/js",express.static("/public/js"))
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:"your-secret-key",
    resave:false,
    saveUninitialized:false,
}))

app.use("/", router);
app.use("/",useroute)


async function db_connect(){

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/userDB")
        console.log("dataBase connected");
        
    } catch (error) {
        console.log(error.message+"dabaase connection error")
        
    }   
}
db_connect();

app.listen(3000, ()=>{
    console.log("server connected")
})