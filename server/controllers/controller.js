const User = require("../models/User");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const signUpUser=async (req,res)=>{
    try {
        const {username,email,password}=req.body;

        const existingUser=await User.findOne({email:email});

        if(existingUser){
            return res.status(400).json({ error: "User with this email already exists" });
        }

        const hashPassword=await bcrypt.hash(password,10);

        const newUser=await User.create({
            username,
            email,
            password:hashPassword
        })

        const token=jwt.sign({email:newUser.email,password:newUser.password},process.env.JWT_SECRET_KEY,{expiresIn:"3d"});
        
        newUser.tokens.push({token});

        await newUser.save();

        return res.status(200).json({AllUser:newUser,token});
        
    } catch (error) {
        return res.status(401).json({error:error.message});
    }

}

const loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const user=await User.findOne({email:email});

        if(!user){
            return res.status(401).json({ error: " email does not exist" });
        }

        const isPasswordValid=await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(401).json({ error: "password is incorrect" });
        }

        return res.status(200).json(user);
        
    } catch (error) {
        return res.status(401).json({error:error.message});
    }


}

const getAllUser=async (req,res)=>{
    try {
        const userData=await User.find().sort({_id:-1});
        
        res.status(200).json(userData);
        
    } catch (error) {
        return res.status(401).json({error:error.message});
    }
}

module.exports={
    signUpUser,loginUser,getAllUser
}