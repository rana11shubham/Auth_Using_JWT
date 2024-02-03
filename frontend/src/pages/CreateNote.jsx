import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
const CreateNote=()=>{
    const navigate=useNavigate();
    const [note,setnote]=useState({
        title:'',
        description:''
    });
    const handleInputChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value});
    }
    async function HandleCreateNote(e){
        e.preventDefault();
        try{
            const response = await axios.post(
                'http://localhost:8000/notes',
                {
                  'title': note.title,
                  'description': note.description,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem('token'),
                  },
                }
              );
              
            const status=response.data.message;
            console.log(status);
            navigate('/notes');
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div className="bg-white p-8 rounded shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-2xl font-bold mb-4">Create Note</h1>
        <form>
            <div className="mb-4">
                <label  className="block text-sm font-medium text-gray-600">Title</label>
                <input type="text" id="title" name="title" className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300" value={note.title} onChange={handleInputChange} />
            </div>
            <div className="mb-4">
                <label  className="block text-sm font-medium text-gray-600">Description</label>
                <textarea id="description" name="description" rows="4" className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Note Description" value={note.description} onChange={handleInputChange} ></textarea>            
                </div>
            <div className="flex items-center justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" onClick={HandleCreateNote}>Create</button>
            </div>
        </form>
    </div>
    )

}

export default CreateNote;