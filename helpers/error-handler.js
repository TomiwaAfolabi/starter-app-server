function errorHandler(err, req, res, next){
  if (err.name ==='UnauthorizedError'){
    console.log("This user is not authorized")
  }

  if (err.name=== 'ValidationError'){
    console.log({message:err})
  }

  return console.log(err);

}
module.exports=errorHandler;