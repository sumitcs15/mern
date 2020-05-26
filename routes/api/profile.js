const express =require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const  Profile= require('../../models/Profile');
const User=require('../../models/Users');
const {check,  validationResult} =require('express-validator');
 
//@route GET api/profile/me
 //@desc Get current users profile
 //@access private
 
 router.get('/me',auth, async (req,res) => {
     try{
         const profile= await Profile.findOne({user:req.user.id}).populate('user',
         ['name', 'avatar']);
         if(!profile){
             return res.status(400).json({msg :'there is no profile for this user'});
         }
         res.json(profile);
     }
     catch(err){
         console.error(err.message);
         res.status(500).send('server error lkjflkjs');
     }
 });



 //@route POST/api/profile
 //@desc ctreate or update profile
 //@access private
router.post('/', 
[
    auth,
[
    check('status','status is required')
    .not().isEmpty(),
    check('skills','skills is required').not().isEmpty()
]
],
async(req, res)=>{
const errors =validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}

const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
    
}=req.body;

const profileFilds={};
profileFilds.user=req.user.id;
if(company) profileFilds.company=company;
if(website) profileFilds.website=website;
if(location) profileFilds.location=location;
if(bio) profileFilds.bio=bio;
if(status) profileFilds.status=status;
if(githubusername) profileFilds.githubusername=githubusername;
if(skills){
profileFilds.skills=skills.split(',').map(skill =>skill.trim());
}
//console.log(profileFilds.skills);
//res.send('hello');
profileFilds.social={};
if(youtube) profileFilds.social.youtube=youtube;
if(twitter) profileFilds.social.twitter=twitter;
if(facebook) profileFilds.social.facebook=facebook;
if(linkedin) profileFilds.social.linkedin=linkedin;
if(instagram) profileFilds.social.instagram=instagram;

try{
    let profile=await Profile.findOne({user:req.user.id});
    if(profile){
        profile =await Profile.findOneAndUpdate(
            {user:req.user.id},
            {$set:profileFilds},
            {new:true});
        return res.json(profile);
    }
    profile= new Profile(profileFilds);
await profile.save();
res.json(profile);
}
catch(err){
    console.error(err.message);
    res.status(500).send('server error....');
}
});



 //@route GET/api/profile/user/:user_id   
 //@desc Get all profile
 //@access public

router.get('/user/:user_id',async (req,res)=>{
    try{
        const profiles= await Profile.findOne({user: req.params.user_id}).populate('user',['name', 'avatar']);
      if(!profiles){
          return res.status(400).json({msg:'there is no such profile'});
      }  res.json(profiles);
    }catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:"profile not found"});
        }
        res.status(500).send('server errormmmmmmm');  }
});
//@route Delete api/pofile
 //@desc delete preofile, user & post
 //@access private
router.delete('/', auth, async(req,res)=>{
    //@todo -remove user post
    //remove profile
    try{
await Profile.findOneAndRemove({user: req.user.id});
await User.findOneAndRemove({_id: req.user.id});
res.json({msg:'user delete'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('server e3rror delete');
    }
});

//@route Put api/pofile/experience
 //@desc add preofile experience
 //@access private
 router.put('/experience' , [auth,[
    check('title','tittle is required').not().isEmpty(),
    check('company','company is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty()
]]
,
 async (req, res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}
const {
    title,
    company,
     location,
      from,
       to,
       current,
       description
}=req.body;

const newExp = {
    title,
    company,
    location, 
    from,
     to ,
     current,
      description
}
 
 try{
     const profile= await Profile.findOne({user: req.user.id});
     profile.experience.unshift(newExp);
     await profile.save();
     res.json(profile);
 }
 catch(err){
     console.error(err.message);
     res.status(500).send('server error profile');
 }}
 );

//@route delete api/pofile/experience/:exp_id
 //@desc deleteexperience from profile 
 //@access private
 router.delete('/experience/:exp_id', auth,
 async (req,res)=>{
     try{
         const profile =await Profile.findOne({user: req.user.id});
 //get index remove 
  const removeIndex=profile.experience.map(item => item.id).indexOf(req.params.exp_id);
  profile.experience.splice(removeIndex,1);
  await profile.save();
  res.json(profile);
        }catch(err){
            console.err(err.message);
            res.status(500).send('server error');
     }
 });


 //@route    Put api/pofile/education
 //@desc     add preofile education
 //@access   private
 router.put('/education' , [auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('fieldofstudy','fieldofstudy is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty()
]] ,
 async (req, res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}
const {
   school,
   degree,
   fieldofstudy,
    from,
    to,
    current,
    description
}=req.body;

const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
     to ,
     current,
      description
}
 
 try{
     const profile= await Profile.findOne({user: req.user.id});
     profile.education.unshift(newEdu);
     await profile.save();
     res.json(profile);
 }
 catch(err){
     console.error(err.message);
     res.status(500).send('server error profile');
 }}
 );

//@route delete api/pofile/education/:edu_id
 //@desc delete education from profile 
 //@access private
 router.delete('/education/:edu_id', auth,
 async (req,res)=>{
     try{
         const profile =await Profile.findOne({user: req.user.id});
 //get index remove 
  const removeIndex=profile.education.map(item => item.id).indexOf(req.params.edu_id);
  profile.education.splice(removeIndex,1);
  await profile.save();
  res.json(profile);
        }catch(err){
            console.err(err.message);
            res.status(500).send('server error');
     }
 });


 module.exports=router;