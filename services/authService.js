const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('../config/config');

const authService={
    async login(username,password){
        try{
            //Find the user by username
            const user=await User.findOne({username});
            //console.log(user);
            // Check if the user exists
            if(user==null){
                throw new Error('Invalid Credentials');
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
                throw new Error('Invalid Password');
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
                throw new Error('Username is already exists!!!');
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
};

module.exports=authService;