import { useState } from "react";
import authService from '../services/authService.jsx';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage,setSuccessMessage]=useState('');
  const [message,setMessage]=useState(null);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const handleRegister = async () => {
    try {
      // Simple validation
      const newErrors = {};

      if (userInfo.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long.';
      }

      if (userInfo.password !== userInfo.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match.";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const response = await authService.register(userInfo);
      if (response.message) {
        setMessage(response.message);
        // Optionally, you can clear the form fields or take other actions
      } else if (response.error) {
        setMessage(response.error);
      }
      console.log(response);
      setSuccessMessage('Account created successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Adjust the delay time as needed (in milliseconds)
    } catch (err) {
      setErrors({ general: 'Registration failed. Please try again.' });
      console.log('Registration failed:', err.message);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userInfo.username}
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className={`shadow appearance-none border ${
              errors.password ? 'border-red-500' : 'border'
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            value={userInfo.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            className={`shadow appearance-none border ${
              errors.confirmPassword ? 'border-red-500' : 'border'
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="******************"
            value={userInfo.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleRegister}
          >
            Create
          </button>
        </div>
      </form>
      {message && (
        <div className="relative block w-full p-4 mb-4 text-base leading-5 text-white bg-green-500 rounded-lg opacity-100 font-regular">
          {message}
        </div>
      )}
      {successMessage && (
        <div className="relative block w-full p-4 mb-4 text-base leading-5 text-white bg-green-500 rounded-lg opacity-100 font-regular">
          {successMessage}
        </div>
      )}
      {errors.general && (
        <div className="relative block w-full p-4 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
          {errors.general}
        </div>
      )}
    </div>
  );
};

export default Register;
