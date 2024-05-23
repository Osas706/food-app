import UserModel from '../models/user.model.js';

//add item to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await UserModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1;
    }else{
        cartData[req.body.itemId] += 1;
    };

    await UserModel.findByIdAndUpdate(req.body.userId, {cartData});

    res.status(201).json({success: true, message: 'Added To Cart'});
  } catch (error) {
    console.log(error, 'Error in addToCart controller ');
    res.status(404).json({success: false, message: 'Error', error});
  };
};


//remove item from user cart
const removeFromCart = async (req, res) => {
   try {
     let userData = await UserModel.findById(req.body.userId);
     let cartData = await userData.cartData;

     if(cartData[req.body.itemId] > 0){
        cartData[req.body.itemId] -= 1
     };

     await UserModel.findByIdAndUpdate(req.body.userId, {cartData})

     res.status(201).json({success: true, message: 'Removed From  Cart'});

   } catch (error) {
     console.log(error, 'Error in removeFromCart controller ');
     res.status(404).json({success: false, message: 'Error', error});
   }
};


//get items from user cart
const getCart = async (req, res) => {
   try {
     let userData = await UserModel.findById(req.body.userId);
     let cartData = await userData.cartData;

     res.status(201).json({success: true, cartData});
     
   } catch (error) {
     console.log(error, 'Error in getCart controller ');
     res.status(404).json({success: false, message: 'Error', error});
   }
};

export {addToCart, removeFromCart, getCart};