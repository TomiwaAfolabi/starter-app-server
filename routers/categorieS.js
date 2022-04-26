const express =require('express');
const {Categories} =require('../models/categories')
const router =express.Router();

router.get(`/`,async (req, res)=>{
  const categoryList =await Categories.find();
  if(!categoryList){
    console.log('success')
  }
  console.log(categoryList);
  
})
router.get(`/:id`,async (req, res)=>{
  const category =await Categories.findById(req.params.id);
  if(!category){
    console.log('Category with this id does not exist')
  }
  console.log(categoryList);
  
})


router.post('/', async(req,res)=>{
  let category= new Categories({
    categoryName: 'Pills',
    icon: 'Image',
    color: 'color'
  })
  category= await category.save();
  if(!category)
  return console.log('the category cannot be created')
})

router.put('/:id',async(req,res)=>{
  const category= await Categories.findByIdAndUpdate(
    req.params.id,{
    categoryName: 'Pills',
    icon: 'Image',
    color: 'color'
    },
    {new:true}
  )
  if(!category)
  return console.log('the category cannot be updated')
})

router.delete('/:id',(req,res)=>{
  Categories.findByIdAndRemove().then(category=>{
    if(category){
      console.log('Deleted successfully')
    }
    else{
      console.log('category not found')
    }
  }).catch(err=>{
    console.log(err)
  })
})
module.exports =router;