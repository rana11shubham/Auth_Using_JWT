import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Notes=(token)=>{
    const [notes,setNotes]=useState([]);

    useEffect(()=>{
        const fetchNotes=async()=>{
            try{
                const response = await axios.get('http://localhost:8000/notes', {
                    headers:{
                        Authorization:localStorage.getItem('token'),
                    },
                });
                console.log(response.data.notes);
                setNotes(response.data.notes);
            }
            catch(e){
                console.log(e);
            }
       }
        fetchNotes();  
    },[]);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note._id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-bold mb-2">{note.title}</h3>
            <p className="text-gray-600">{note.description}</p>
            {/* Add other properties as needed */}
          </div>
        ))}
      </div>
    )

}

export default Notes;