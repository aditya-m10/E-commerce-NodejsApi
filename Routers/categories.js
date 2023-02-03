const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false,msg:"No Records  Found"})
    } 
    res.status(200).send(categoryList);
})
router.get(`/:id`, async (req, res) =>{
    const categoryList = await Category.findById(req.params.id);
    if(!categoryList) {
        res.status(500).json({success: false,msg:"category not found"})
    } 
    res.status(200).send(categoryList);
})
router.put(`/:id`, async (req, res) =>{
    const categoryList = await Category.findByIdAndUpdate({
        _id:req.params.id}
        ,{
        name:req.body.name
    },
    {
        new:true
    });
    if(!categoryList) {
        res.status(500).json({success: false,msg:"category not found"})
    } 
    res.status(200).send(categoryList);
})


router.post('/',async(req,res)=>{
    let category=new Category({
        name: req.body.name
    })
    category=await category.save()
    if(!category){
    return res.status(404).send("category cannot be created ")}
    res.send(category)
})
router.delete('/:id',(req,res)=>{
    Category.findByIdAndDelete(req.params.id).then(category=>{
        if(category){
            return res.status(200).json({
                succes:true, msg:"Category deleted"
            })
        }else{
            return res.status(404).json({
                success:false ,msg:"category not Found"
        })}
    }).catch(
        err=>{
            return res.status(200).json({success:false ,error:err})

        }
    )
})
module.exports =router;