const mongoose=require('mongoose');
const {Schema}=mongoose;

const noteSchema= new Schema({
    user:{type: Schema.Types.ObjectId,ref:'User',required:true},
    title:{type: String,required:true},
    description:{type:String,required:true},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date,default:Date.now},
});

const noteModel=mongoose.model('Note',noteSchema);

module.exports=noteModel;