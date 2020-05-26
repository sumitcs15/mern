const express =require('express');
const router = express.Router();
const gravatar =require('gravatar');
const { check, validationResult } = require('express-validator');
const config=require('config');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

const User= require('../../models/Users');

 // @route   POST api/users
 // @desc    Register user
 // @access  Public

 router.post(
     '/',
     [
    check('name','name is required').not().isEmpty(),
    check('email','valid email is required').isEmail(),
    check('password','please enter a valid paaword').isLength({min:6})
],
async (req,res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const {name, email, password }= req.body;
     try{
         let user = await User.findOne({email});

         if(user){
         return res.status(400).json({ errors: [{msg:'user already exist'}] });
       }
//avatar start from here
const avatar =gravatar.url(email,{
    s:'200',
    r:'pg',
    d:'mm'
})

user = new User({
    name,
    email,
    avatar,
    password
});

// password encription starts from hear  //gensalt(10)more the no we have more secure the no is
const salt =await bcrypt.genSalt(10);

user.password=await bcrypt.hash(password, salt);

await user.save();

//jwt

const payload={
    user:{
        id:user.id
    }
}
jwt.sign(
    payload, 
    config.get('jwtSecret'),
    {expiresIn:360000},
(err,token)=> {
    if (err) throw err;
    
    res.json({token});
})


     }catch(err){
         console.error(err.message);
         res.status(500).send('server error....');
     }
});

 module.exports = router;