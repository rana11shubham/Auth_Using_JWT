const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('../config/config');
const noteModel=require('../models/Notes');

const authService={
    async login(username,password){
        try{
            //Find the user by username
            const user=await User.findOne({username});
            //console.log(user);
            // Check if the user exists
            if(user==null){
                return {error:'Invalid Credentials!!!'};
            }
            // Compare the provided password with the stored hashed password
            const passwordMatch=await bcrypt.compare(password,user.Password);
            //console.log(passwordMatch);
            if(passwordMatch){
                const token=jwt.sign({username},config.jwtSecret,{
                    expiresIn:'2h',
                });
                return {token};
            }
            else{
                return {error:'Invalid Password'};
            }

        } catch(err){
            throw err;
        }

    },
    async register(username,password){
        // Checking whether the user has already in the system or not.
        try{
            const existingUser=await User.findOne({username});
            if(existingUser){
                throw new Error('User already exists!!!');
            }
            // Hash the password
            const hashedPassword=await bcrypt.hash(password,10);
            // Create a new user
            const newUser=new User({
                username:username,
                Password:hashedPassword,
            });
            await newUser.save();
            return {message:'Registration successful'};
        } catch(err){
            throw err;
        }
    },
    async deleteUser(username){
        try {
          const userId = await User.findOne({ 'username': username });
      
          if (userId) {
            //const note = await noteModel.findOneAndDelete({ user: userId._id });
            const user = await User.findOneAndDelete({ _id: userId });
      
            if (user) {
              return { message: 'Account Deleted', result: user };
            } else {
              return { error: 'User not found' };
            }
          } else {
            return { error: 'User not found' };
          }
        } catch (error) {
          console.error('Error deleting user account:', error);
          throw new Error("Internal Server Error");
        }
      },
    }
module.exports=authService;