const mongoose= require('mongoose');

const productSchema =mongoose.Schema({
  productName:{
    type:String,
    required:true,
  },
  productDescription: {
    type:String,
    required:true
  },
  richDescription:{
    type: String,
    default:''
  },
  image:{
    type: String,
    dafault:''

  } ,
  images:[{
   type:String,
  }],
  price:{
    type: Number,
    default:0
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  countInstock: {
    type: Number,
    require:true,
    min:0,
    max: 255
  },
  numReviews:{
   type:Number,
   default:0,
  },
  isFeatured:{
    type:Boolean,
    default:false
  },
  dateCreated:{
    type:Date,
    default:Date.now
  }
})
exports.Product= mongoose.model('Product', productSchema)
