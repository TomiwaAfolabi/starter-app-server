const express =require('express');
const {Order} =require('../models/order');
const { OrderItem } = require('../models/order-item');
const router =express.Router();

router.get(`/`,async (req, res)=>{
   const orderList= await Order.find().populate('user', 'FirstName').sort({'dateOrdered': -1});
   if(!orderList){
     console.log('orders availble')
   }

  console.log(orderList);
})
router.get(`/:id`,async (req, res)=>{
  const order= await Order.findById(req.params.id)
  .populate('user', 'FirstName')
  .populate({path: 'orderItems', 
  populate:{ path:'product', populate: 'category'}});
  if(!order){
    console.log('orders availble')
  }

 console.log(order);
})


router.post('/', async(req,res)=>{
  const orderItemsIds= Promise.all(req.body.orderItems.map(async orderItem=>{
    let newOrderItem =new OrderItem({
      quantity: orderItem.quantity,
      product:orderItem.product
    })

    newOrderItem = await newOrderItem.save();

    return  newOrderItem._id;
  }))
  const orderItemsIdResolved = await orderItemsIds;

  const totalPrices =await Promise.all(orderItemsIdResolved.map(async(orderItemId)=>{
 const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price')
 const totalPrice=orderItem.product.pricr * orderItem.quantity;
 return totalPrice;
  }))

  const totalPrice=totalPrices.reduce((a,b)=> a+b, 0);
  
  let order= new Order({
    orderItems:  orderItemsIdResolved,
    shippingAddress1:req.body.shippingAddress1,
    shippingAddress2:req.body.shippingAddress2,
    city:req.body.city,
    zip:req.body.zip,
    country:req.body.country,
    phone:req.body.phone,
    status:req.body.status,
    totalPrice:totalPrice,
    user:req.body.user,
    dateOrdered:req.body.dateOrdered,
  })
  order= await order.save();
  if(!order)
  return console.log('the order cannot be created')
})

router.put('/:id', async(req,res)=>{
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status
    },
    {new: true}
  )

  if(!order)
  return console.log('order cannot be found');
    
    })


router.delete('/:id',(req,res)=>{
 Order.findByIdAndRemove(req.params.id).then( async order=>{
    if(order){
      await order.orderItems.map(async orderItem =>{
      await OrderItem.findByIdAndRemove(orderItem)
      })
      console.log('Deleted successfully')
    }
    else{
      console.log('order not found')
    }
  }).catch(err=>{
    console.log(err)
  })
})

router.get('/get/totalsales',async(req,res)=>{
  const totalSales= await Order.aggregate([
    {$group: {_id:null, totalsales: {$sum:`$totalPrice`}}}
      
  ])
  if(!totalSales){
    console.log("The sales is not avalaible ")
  }
  console.log({totalSales: totalSales.pop().totalSales});
})
router.get(`/get/userorders/:userid`,async (req, res)=>{
  const userOrderlist= await Order.findById({user:req.params.userid})
  .populate({path: 'orderItems', 
  populate:{ path:'product', populate: 'category'}}).sort({'dateOrdered':-1});
  if(!userOrderlist){
    console.log('orders availble')
  }

})
module.exports =router;