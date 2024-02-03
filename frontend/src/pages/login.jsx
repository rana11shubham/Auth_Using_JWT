
import { useState,useEffect } from "react";
import authService from '../services/authService.jsx';
import {useNavigate } from 'react-router-dom';

const Login=()=>{
    const [Credentials,setCredentials]=useState({
        username:'', password:''
    });
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const handleInputChange=(e)=>{
        setCredentials({...Credentials,[e.target.name]:e.target.value});
        setError(null);
    }
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

    const handleLogin = async () => {
        try {
          // Client-side validation
          if (!Credentials.username || !Credentials.password) {
            setError('Please enter both username and password.');
            return;
          }
    
          const status = await authService.login(Credentials);
          console.log(status);
          navigate('/notes');
        } catch (err) {
          setError('Invalid username or password');
          console.log('Login failed:', err.message);
        }
      };

    function handleCreateNew(){
        navigate('/register');
    }

return (
    <div className="w-full max-w-xs">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
        Username
        </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={Credentials.username} type="text" placeholder="Username" name="username"   onChange={handleInputChange}></input>
    </div>
    <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2">
        Password
    </label>
  <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************" value={Credentials.password} onChange={handleInputChange}/>
</div>
<div className="flex items-center justify-between">
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleLogin}>
    Sign In
  </button>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleCreateNew}>
    Create New
  </button>
  
</div>
</form>
{error && (
        <div className="relative block w-full p-4 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
          {error}
        </div>
      )}

</div>

);

};
export default Login;
