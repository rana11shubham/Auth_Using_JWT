const jwt=require('jsonwebtoken');
const config=require('../config/config');

const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization || req.cookies.jwt; 
    console.log(token);  
    
    if(!token){
        return res.status(401).json({error:'Unauthorized- No token provided'});
    }
    try{
        const decodedToken=jwt.verify(token,config.jwtSecret);
        //console.log(decodedToken);
        req.user=decodedToken;
        next();
    } catch(err){
        return res.status(401).json({error:'Unauthorized- Invalid token'});
    }
};

module.exports=authMiddleware;