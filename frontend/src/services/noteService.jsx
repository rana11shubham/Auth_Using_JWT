import axios from 'axios';
import { response } from 'express';

const API_URL='http://localhost:8000/notes';

const noteService={
    update: async(noteInfo)=>{
        try{
            const noteId=noteInfo.noteId;
            console.log(noteId);
            const response = await axios.put(
                `http://localhost:8000/notes/${noteId}`,
                {
                  'title': noteInfo.title,
                  'description': noteInfo.description,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem('token'),
                  },
                }
              );
            const status=response.data.message;
            console.log(status);
            return status;
        }
        catch(e){
            throw new Error('Note updation failed');
        }
    },
    createNote:async(noteInfo)=>{
      try{
        const noteId=noteInfo.noteId;
        console.log(noteId);
        const response = await axios.post(
            'http://localhost:8000/notes',
            {
              'title': noteInfo.title,
              'description': noteInfo.description,
            },
            {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            }
          );
        const status=response.data.message;
        console.log(status);
        return status;
    }
    catch(e){
        throw new Error('Note creation failed');
    }
    },
  
}

export default noteService;