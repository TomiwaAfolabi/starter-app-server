const mongoose= require('mongoose');

const UserSchema =mongoose.Schema({
  FirstName:{
    type:String,
    required:true
  },
  LastName:{
    type:String,
    required:true

  } ,
  Email:{
    type: String,
    required:true

  } ,

  Address:{
    type:String,
    requre:true,

  } ,
  PhoneNo: {
    type:Number,
    required:true

  },
  userImage: {
    type:String
  },
  Country: {
    type: Number,
    required:true
  },
  isVendor:{
    type: Boolean,
    default:false
  }
})
exports.User= mongoose.model('User', UserSchema)