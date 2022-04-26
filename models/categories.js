const mongoose= require('mongoose');

const CategoriesSchema =mongoose.Schema({
  Categoryname:{
    String
  },
  icon:{
    type:String
  },
  color:{
    type:String

  }
})
exports.Categories= mongoose.model('Categories', CategoriesSchema)