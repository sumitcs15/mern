const mongoose =require('mongoose');
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
}
});
module.exports=Users=mongoose.model('user', UserSchema);
//models take two argument 1) name of model 2) name of schema