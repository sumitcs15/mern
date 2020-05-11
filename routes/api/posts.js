const express =require('express');
const router = express.Router();
const {check, validationResult} =require('express-validator');
const auth = require('../../middleware/auth');
const Post =require('../../models/Post'); 
const Profile =require('../../models/Profile'); 
const User =require('../../models/Users'); 

//@route POST api/posts
 //@desc create a post
 //@access Private
 router.post('/',
  [
      auth,
    [
     check('text','text is required').not().isEmpty()
    ]
],
    async(req,res) => {
     const errors=validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
     }
     try{
        const user = await User.findById(req.user.id).select('-password');

        const newPost= new Post({
        text: req.body.text,
        name:user.name,
        avatar:user.avatar,
        user: req.user.body
} );
    const post = await newPost.save();
    res.json(post);

    }   
    catch(err){
       console.errors(err.message);
        res.status(400).send('server error...posts');
    }
 });

//shows all the post
 //@route GET api/posts
 //@desc GET all  post
 //@access Private
 router.get('/',
     auth, 
    async(req,res)=>{
    try{
        const posts=await Post.find().sort({date: -1});
        res.json(posts);
     }
     catch(err){
         console.errors(err.message);
         res.status(500).send('server error');
     }
 });
 
//shows post by id
 //@route GET api/posts/:id
 //@desc GET all post
 //@access Private
 router.get('/:id',
    auth,
    async(req,res)=>{
       try{
        const post=await Post.findById(req.params.id);

     if(!post){
        return res.status(404).json({msg:'post not found'});
     }
    res.json(post);
    }
    catch(err){
        console.error(err.message);
        if(err.kind==='ObjectId'){
            return res.status(404).json({mgs:'post not found'});
        }
        res.status(500).send('server error');
    }
});

//delete post by id
 //@route Delete api/Posts/:id
 //@desc Delete a post
 //@access Private
 router.delete('/:id',
  auth,
   async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg:'post not found'});
        }
        //checking the user
        {/*
console.log(post);
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg:'you are not authorize to do so'});
        */ }
    //}
        await post.remove();
        res.json({mgs:'post deleated'});

    }
    catch(err){
        console.error(err.message);
        if(err.kind ==='ObjectId'){
            return res.status(404).json({mgs:'post not found'});
        }
        res.status(500).send('server error1');
    }
});



// @route PUT api/posts/like/:id
//@desc like a post
//@access private
router.put('/like/:id',
 auth,
  async(req,res)=>{
try{
const post= await Post.findById(req.prams.id);
{/*
//console.log(post);
if(post.likes.filter(like =>like.user.toString() === req.user.id).length > 0){
    return res.status(400).json({msg:'post already liked'});
}
*/}
post.likes.unshift({user: req.user.id});
await post.save();
res.json(post.likes);

}catch(err){
console.error(err.message);
res.status(500).json({msg:'server error'});
}
});

 module.exports=router;