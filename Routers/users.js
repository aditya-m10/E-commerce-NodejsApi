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
router.post('/register',async(req,res)=>{
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
router.post('/login',async(req,res)=>{
    let user=await User.findOne({email:req.body.email})
    const secret=process.env.SECRET
    if(!user){
        return res.send(400).send("Invalid Credentials ")
    }
    if(user && bycrpt.compareSync(req.body.password, user.password)){
        const token=jwt.sign(
            {
                userID:user.id,
                isAdmin:user.isAdmin
            },
            secret,{
                expiresIn:'1h'
            }
          )
        return res.status(200).send({user:user.email,token :token})
    }else{
        return res.status(400).send("Wrong Password")
    }
    
})
router.delete('/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({
                succes:true, msg:"Product deleted"
            })
        }else{
            return res.status(404).json({
                success:false ,msg:"User not Found"
        })}
    }).catch(
        err=>{
            return res.status(200).json({success:false ,error:err})

        }
    )
})

router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments()

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})

module.exports =router;