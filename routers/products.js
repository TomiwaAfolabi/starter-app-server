const express =require('express');
const { Categories } = require('../models/categories');
const {Product} =require('../models/product')
const router = express.Router();
const mongoose =require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP={
  'image/png' :'png',
  'image/jpeg' :'jpeg',
  'image/jpg' :'jpg'

}

var storage = multer.diskStorage({
     destination : function (req, file, cb ){
       const invalid = FILE_TYPE_MAP(file.mimetype);
       let uploadError = new Error ('Invalid image type');

       if(invalid){
         uploadError= null
       }
        cb(uploadError, 'public/uploads')

     },
     filename: function(req, file, cb){
       const filename =file.originalname.split(' ').join('-');
       const extension = FILE_TYPE_MAP(file.mimetype);
       cb(null,`${filename} -${Date.now()}.${extension}` )
     }

})

const uploadOptions= multer ({storage:storage});


router.get(`/`,async (req, res)=>{
  let filter ={};
  if (req.query.category)
  {
    const filter ={category: req.query.Categories.split(',')}
  }
  const productList =await Product.find({category:[filter]}).populate('category')

  if(!productList){
    console.log('success')
  }
  console.log(productList);
  
})

router.get(`/`,async (req, res)=>{
  const productList =await Product.findById(req.params.id).populate('category');
  if(!productList){
    console.log('success')
  }
  console.log(productList);
  
})
router.post(`/`,uploadOptions.single('image'), async (req, res)=>{
  const file = req.file;
  if(!file) return console.log('no image uploaded')

  const category =await Categories.findById(req.body.category);
  if(!category)
  return console.log(' Category does not exist');
   const filename = req.file.filename
   const basePath= `${req.protocol}://${req.get('host')}/public/upload/`;

  const product = new Product({
  productName: req.body.productName,
  productDescription:req.body.productDescription, 
  richDescription:req.body.richDescription,
  image: `${basePath}${filename}`, 
  images:req.body.images,
  price:req.body.price,
  category:req.body.category,
  countInstock:req.body.countInstock ,
  rating:req.body.rating ,
  numReviews:req.body.numReviews,
  isFeatured:req.body.isFeatured,
  dateCreated:req.body.dateCreated,
  })

  product =await product.save();
  
  if(!product)
  return console.log('The product cannot be created')

})

router.put('/:id',async(req,res)=>{
  if (!mongoose.isValidObjectId(req.params.id)){
    return console.log("Invalid product id")
  }
  const category =await Categories.findById(req.body.category);
  if(!category)
  return console.log(' Category does not exist');

  const product= await Product.findByIdAndUpdate(
    req.params.id,{
      productName: req.body.productName,
      productDescription:req.body.productDescription, 
      richDescription:req.body.richDescription,
      image:req.body.image,
      images:req.body.images,
      price:req.body.price,
      category:req.body.category,
      countInstock:req.body.countInstock ,
      rating:req.body.rating ,
      numReviews:req.body.numReviews,
      isFeatured:req.body.isFeatured,
      dateCreated:req.body.dateCreated,
    },
    {new:true}
  )
  if(!product)
  return console.log('the category cannot be updated')

})

router.delete('/:id',(req,res)=>{

  Product.findByIdAndRemove().then(product=>{
    if(product){
      console.log('Deleted successfully')
    }
    else{
      console.log('category not found')
    }
  }).catch(err=>{
    console.log(err)
  })
})

router.get(`/get/count`,async (req, res)=>{
  const productCount =await Product.countDocuments((count => count))

  if(!productCount){
    console.log('success')
  }
  console.log(productCount);
  
})

router.get(`/get/featured/:count`,async (req, res)=>{
  const count =req.params.count ? req.params.count: 0
  const products =await Product.find({isFeatured:true}).limit(+count)

  if(!products){
    console.log('success')
  }
  console.log(products);
  
})
router.put('/gallery-images/:id',uploadOptions.single('image', 5),async(req,res)=>{
  if (!mongoose.isValidObjectId(req.params.id)){
    return console.log("Invalid product id")
  }
  const files = req.files
  let imagesPaths=[];
  const basePath= `${req.protocol}://${req.get('host')}/public/upload/`;

  if(files){
    files.map(file=>{
      imagesPaths.push(`${basePath}${file.filename}`)
    })
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      images:imagesPaths
    },
    {new: true}
  )
  if(!product)
  return console.log('the category cannot be updated')


})


module.exports=router;