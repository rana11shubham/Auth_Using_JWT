const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config=require('../config/config');

const authService={
    async login(email_id,password){

    },
    async register(username,email_id,password){

    },
};

module.exports=authService;