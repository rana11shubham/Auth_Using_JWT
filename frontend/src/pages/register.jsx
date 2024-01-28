
import { useState } from "react";
import authService from '../services/authService.jsx';

const Register=()=>{
    const [userInfo,setUserInfo]=useState({
        username:'', password:''
    });
    const handleInputChange=(e)=>{
        setUserInfo({...userInfo,[e.target.name]:e.target.value});
    }
    const handleRegister=async()=>{
        try{
            //console.log(userInfo);
            const status=await authService.register(userInfo);
            //console.log(status);
        }
        catch(err){
            console.log('Registration failed:',err.message);
        }
    };

return (
    <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
            Username
            </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={userInfo.username} type="text" placeholder="Username" name="username"   onChange={handleInputChange}></input>
        </div>
        <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
        </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************" value={userInfo.password} onChange={handleInputChange}/>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleRegister}>
        Sign In
      </button>
      
    </div>
  </form>

</div>

);

};
export default Register;
