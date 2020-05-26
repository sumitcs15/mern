const jwt =require('jsonwebtoken');
const config = require('config');
module.exports=function(req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');
    //check whether i have token or not
    if(!token){
        return res.status(401).json({msg:'no token ,access denied'});
    }
    //verifying token  token
    try{
        // syntex  jwt.verify(token, secretOrPublicKey, [options, callback])
        const decoded=jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;  
        //decode.user->(here user is the ->user id in the payload)
        next();
    }catch(err){
        res.status(401).json({msg:'token not valid'});
    }
};
