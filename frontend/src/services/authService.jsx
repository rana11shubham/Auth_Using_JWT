import axios from 'axios';

const API_URL='http://localhost:8000';
const instance=axios.create({
    timeout:10000,
});

const authService={
    register: async(userInfo)=>{
        try{
            const response=await axios.post("http://localhost:8000/auth/register",userInfo);
            const status=response;
            console.log(status);
            return status.data.message;
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
    logout:async()=>{
        try{
            localStorage.removeItem('token');
        }
        catch(err){
            throw new Error(err);
        }
    },
    isAuthenticated:async()=>{
        if(localStorage.getItem('token')==null)
            return false;
        return true;
    },
    deleteAccount: async () => {
        console.log('Deleting user account...');
        try {
            console.log('Deleting user account...');
          const response = await axios.delete('http://localhost:8000/auth/DeleteUser',{
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
          console.log("response2");
    
          // Assuming the response indicates a successful account deletion
          // (you might want to check the response status or content)
     
          //localStorage.removeItem('token');
      
          
          return true;
        } catch (err) {
          console.error('Error deleting user account:', err);
          console.log('Error response:', err.response); 
          throw err;
        }
      },

}

export default authService;