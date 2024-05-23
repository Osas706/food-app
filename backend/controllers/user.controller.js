import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

//login user
const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        //check if user exists
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: 'User does not exist'});
        };

        //comapare password to database hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        };

        //create token and send response
        const token = createToken(user._id);
        res.status(201).json({success: true, token});
    } catch (error) {
        console.log(error, 'Error in loginUser controller');
        res.status(404).json({success: false, message: 'Error', error});
    };
};

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
};

//register user
const registerUser = async(req, res) => {
   const {name, password, email} = req.body;

   try {
     //checking is user already exists
     const exists = await UserModel.findOne({email});
     if(exists){
        return res.status(400).json({success: false, message: 'User already exists'});
     };

     //validating email format & strong password
     if(!validator.isEmail(email)){
        return res.status(400).json({success: false, message: 'Please enter a valid email'});
     };

     //password
     if(password.length < 8){
        return res.status(400).json({success: false, message: 'Please enter strong password'});
     };

     //hashing user password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     const newUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
     });

     const user = await newUser.save();

     const token = createToken(user._id);

     res.status(201).json({success: true, token});

   } catch (error) {
     console.log(error, 'Error in registerUser controller');
     res.status(404).json({success: false, message: 'Error', error});
   }
};

export {loginUser, registerUser};