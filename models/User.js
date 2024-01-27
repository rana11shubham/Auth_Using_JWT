const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema= new Schema({
    username:String,
    Password:String,
    notes:[{type:Schema.Types.ObjectId,ref:'Note'}],
});

const userModel=mongoose.model('User',userSchema);

module.exports=userModel;