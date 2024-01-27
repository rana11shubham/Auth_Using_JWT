const noteModel=require('../models/Notes');
const userModel=require('../models/User');

const noteService={
    async CreateNote(username,title,description){
        // Create a new Note
        try{
            const userId=await userModel.findOne({'username':username});
            const newNote=new noteModel({
                user:userId._id,
                title:title,
                description:description,
                createdAt:Date.now(),
            });
            await newNote.save();
            return newNote;
        }
        catch(err){
            throw new Error("Internal Server Error");
        }
    },
    async RetrieveNote(username){
        // RetrieveNote
        try{
            const userId=await userModel.findOne({'username':username});
            const notes= await noteModel.find({user:userId._id});
            return notes;
        } catch(err){
            throw new Error('Internal Server Error');
        }
    },
    async UpdateNote(noteId,username,title,description){
        // UpdateNote
        try{
            const userId=await userModel.findOne({'username':username});
            const updatedNote=await noteModel.findOneAndUpdate(
                {
                _id:noteId,user:userId._id
                },{
                    title,description,updatedAt:Date.now()
                });
                console.log(updatedNote);
                if(!updatedNote){
                    throw new Error("Note not found");
                }
                return updatedNote;
             }
        catch(err){
            throw new Error("Internal Server Error");
        }
    },
    async DeleteNote(username,noteId){
        // DeleteNote
        try{
            const userId=await userModel.findOne({'username':username});
            const note=noteModel.findOneAndDelete({
                _id:noteId,user:userId._id
            });
            if(!note){
                throw new Error('Note not found');
            }
            return note;
        }
        catch(error){
            throw new Error("Internal Server Error");
        }

    }
}

module.exports=noteService;