
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Notes from "./pages/notes.jsx";
import EditNote from "./pages/EditNote.jsx";
import CreateNote from "./pages/CreateNote.jsx";




function App() {

  return (
 
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/notes' element={<Notes/>}></Route>
        <Route path='/EditNote' element={<EditNote/>}></Route>
        <Route path='/CreateNote' element={<CreateNote/>}></Route>
        
        </Routes>
    </BrowserRouter>

    

      
  )
}

export default App
