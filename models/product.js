const mongoose=require("mongoose")


const productSchema= mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    brand:{
        type:String,
        default:""
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    }
});
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});
module.exports= mongoose.model("products",productSchema)
