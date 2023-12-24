const isAuth = async(req,res,next)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
        next();
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
}

module.exports = isAuth;