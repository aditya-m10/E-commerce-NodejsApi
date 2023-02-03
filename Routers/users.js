const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bycrpt=require("bcrypt")
const jwt=require("jsonwebtoken")

router.get(`/`, async (req, res) =>{
    const user = await User.find().select('-password');

    if(!user) {
        res.status(500).json({success: false,msg:"No Records  Found"})
    } 
    res.status(200).send(user);
})

router.get(`/:id`, async (req, res) =>{
    const user = await User.findById(req.params.id).select('-password');
    if(!user) {
        res.status(500).json({success: false,msg:"category not found"})
    } 
    res.status(200).send(user);
})
router.post('/',async(req,res)=>{
    let user=new User({
        name: req.body.name,
        email: req.body.email,
        password: bycrpt.hashSync(req.body.password,10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        address: req.body.address,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user=await user.save()
    if(!user){
    return res.status(404).send("User cannot be created ")}
    res.send(user)
})
router.post('/auth/login',async(req,res)=>{
    let user=await User.findOne({email:req.body.email})
    const secret=process.env.SECRET
    if(!user){
        return res.send(400).send("Invalid Credentials ")
    }
    if(user && bycrpt.compareSync(req.body.password, user.password)){
        const token=jwt.sign(
            {
                userID:user.id
            },
            secret,{
                expiresIn:'0.5h'
            }
          )
        return res.status(200).send({user:user.email,token :token})
    }else{
        return res.status(400).send("Wrong Password")
    }
    
})
module.exports =router;