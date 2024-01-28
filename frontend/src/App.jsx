
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Notes from "./pages/notes.jsx";

function App() {

  return (
 
      <BrowserRouter>
        <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/notes' element={<Notes/>}></Route>
        </Routes>
    </BrowserRouter>

    

      
  )
}

export default App
