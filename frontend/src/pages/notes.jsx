import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import authService from '../services/authService';

const Notes=(token)=>{
    const [notes,setNotes]=useState([]);
    const navigate=useNavigate();
    async function EditNote(note){
       navigate('/EditNote',{state:note});
    }
   
    useEffect(()=>{
        const fetchNotes=async()=>{
            try{
                if(authService.isAuthenticated()){
                    const response = await axios.get('http://localhost:8000/notes', {
                    headers:{
                        Authorization:localStorage.getItem('token'),
                    },
                });
                setNotes(response.data.notes);
            }
            else{
                navigate('/login')
            }
                }
                
            catch(e){
                console.log(e);
            }
       }
        fetchNotes();  
    },[]);
    useEffect(()=>{
        const checkAuthentication=async()=>{
            try{
                const response=await authService.isAuthenticated();
                if(response==true){
                    navigate('/notes');
                }
                else{
                    navigate('/login');
                    console.log('Not authenticated');
                }
            }
            catch(err){
                console.log(err);
            }
        }
        checkAuthentication();
    },[navigate]);

    async function DeleteNote(note_id) {

        try {
            const response = await axios.delete(`http://localhost:8000/notes/${note_id}`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            console.log(response);
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== note_id));
            navigate('/notes');
        } catch (err) {
            console.log(err);
        }
    }
 

   


    return (
        <div>
       <Navbar/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
        {notes.map((note) => (
          <div key={note._id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-bold mb-2">{note.title}</h3>
            <p className="text-gray-600">{note.description}</p>
            
            <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>EditNote(note)}>Edit</button>
            <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>DeleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
      </div>
    )

}

export default Notes;