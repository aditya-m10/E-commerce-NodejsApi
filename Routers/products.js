const express=require("express")
const { default: mongoose } = require("mongoose")
const {Category}  = require("../models/category")
const app=express()
const Product=require("../models/product")

const router=express.Router()

router.get("/", async (req,res)=>{
    if(req.query.category){
        var  product =await Product.find({category:req.query.category}).populate("category")//select("name image -_id")
    }else{
        var product =await Product.find().populate("category")//select("name image -_id")

    }
    if(!product){
        res.status(500).json({success:false})
    }
      res.send(product)
})
router.get("/:id", async (req,res)=>{
    const product =await Product.findById(req.params.id).populate("category")
    if(!product){
        res.status(500).json({success:false})
    }
      res.send(product)
})
router.delete('/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({
                succes:true, msg:"Product deleted"
            })
        }else{
            return res.status(404).json({
                success:false ,msg:"Product not Found"
        })}
    }).catch(
        err=>{
            return res.status(200).json({success:false ,error:err})

        }
    )
})
router.post("/", async (req,res)=>{
    const category=await Category.find({_id:req.body.category})
    if(!category) {
       return  res.status(400).send("Invalid category")
    } 

    let product = new Product({
        name: req.body.name,
        image: req.body.image,
        description:req.body.description,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        rating:req.body.rating,
        countInStock:req.body.countInStock
    })
    product=await product.save()
    if(!product) {
        res.status(500).json({success: false,msg:"The product faild to upload"})
    } 
    res.status(200).send(product);
})


router.put("/:id", async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send("Invalid Category")
    }
    const category=await Category.findById(req.body.category)
    if(!category) {
       return  res.status(400).send("Invalid category")
    } 
    const product=await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: req.body.image,
            description:req.body.description,
            brand:req.body.brand,
            price:req.body.price,
            category:req.body.category,
            rating:req.body.rating,
            countInStock:req.body.countInStock
        },
            {
                new:true
            })
        if(!product) {
               return res.status(500).json({success: false,msg:"Product not updated"})
            } 
        res.status(200).send(product);
})

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments()

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})
module.exports=router