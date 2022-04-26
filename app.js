const express =require('express');
const app= express();
const bodyParser = require('body-parser')
const morgan= require('morgan')
const mongoose= require('mongoose');
const mongoUri ='mongodb+srv://admin:password1234@cluster0.kuiz5.mongodb.net/Users?retryWrites=true&w=majority'
const cors = require('cors');
const authJwt=require('./helpers/jwt');
const errorHandler =require('./helpers/error-handler')

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


require('dotenv/config');
const api= process.env.API_URL;

//middleware
app.use(cors());
app.options('*',cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt);
app.use('public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler)



//Routes
const productsRouter =require('./routers/products')
const userRoutes= require ('./routers/users');
const orderRoutes= require('./routers/orders');
const categoriesRoutes= require('./routers/categorieS');


app.use(`${api}/catgories`, categoriesRoutes)
app.use(`${api}/products`, productsRouter)
app.use(`${api}/users`, userRoutes)
app.use(`${api}/orders`, orderRoutes)

//Database
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Users'
})
.then(() => console.log('DB Connected 🔥🔥 '))
.catch((error) => console.log('DB Connection Failed => [', error, ']'));

app.listen(3000,()=>{
  console.log(api);
console.log('server is running');
})

var server =app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  consele.log ('Express works' + port);
  
})
module.exports = app;
