import axios from 'axios';

const API_URL='http://localhost:8000';

const authService={
    register: async(userInfo)=>{
        try{
            console.log("Hello");
            const response=await axios.post("http://localhost:8000/auth/register",userInfo);
            const status=response.data.message;
            console.log(status);
            return status;
        }
        catch(e){
            throw new Error('Registration failed. Please try again');
        }
    },

    login:async(userInfo)=>{
        try{
            const response=await axios.post("http://localhost:8000/auth/login",userInfo,{ withCredentials: true });
            const status=response.data;
            localStorage.setItem('token', status.token);
            console.log(status);
            return status;
        }
        catch(err){
            throw new Error('Login failed. Please try again');
        }

    },

}

export default authService;