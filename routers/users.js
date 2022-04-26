const express =require('express');
const User =require('../models/user')
const router = express.Router();
const  bcrypt = require('bcryptjs');
const  { authentication } =require("../firebase/firebase-config");
const {signInWithEmailAndPassword,createUserWithEmailAndPassword } =("firebase/auth");
const jwt = require ('jsonwebtoken');

router.get(`/`,async (req, res)=>{
  const userList =await User.find().select('-password');
if(!userList){
  console.log('user dont exist')
}
  res.send (userList);
})

router.get(`/:id`,async (req, res)=>{
  const user =await User.findById(req.params.id).select('-password');;
  if(!user){
    console.log('success')
  }
  console.log(user);
  
})

router.post('/register', async(req,res)=>{

  let user= new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email:req.body.LastName,
    password:bcrypt.hashSync(req.body.password),
    Address:req.body.Address,
    PhoneNo:req.body.PhoneNo,
   
  })

  createUserWithEmailAndPassword(authentication,email,password)
    .then( (re)=>{
     return console.log("Registration successful");
    })
    .catch((re)=>{
      return console.log('There was issue with registration process, Email address already exists.');
    })

  user = await User.save();
  if(!user)
  return console.log('the user cannot be created')
})


router.post('./login', async (req, res)=>{
  const user =await User.findOne({email: req.body.email})
  const secret= process.env.secret;

  if(!user){
    return console.log('user doesnt exist');
  }
  signInWithEmailAndPassword(authentication,user,user.password)
    .then((re)=>{
      const token= jwt.sign({
        userId: user.id,
        isVendor: user.isVendor
      },
       secret,
       {expiresIn: '1d'}
      )
      console.log('user: ', user.email, 'token: ', token)
       console.log("User successfully signed in ")
      })
    .catch((re)=>{
      console.log(re);
    })
})

router.get(`/get/count`,async (req, res)=>{
  const userCount =await User.countDocuments((count => count))

  if(!userCount){
    console.log('success')
  }
  console.log(userCount);
})
  
router.delete('/:id',(req,res)=>{
  User.findByIdAndRemove(req.params.id).then(user=>{
    if(user){
      console.log('Deleted successfully')
    }
    else{
      console.log('user not found')
    }
  }).catch(err=>{
    console.log(err)
  })
})

module.exports =router;