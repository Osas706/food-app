import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import Stripe from 'stripe';

import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:5173';

    try {
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        const line_items = req.body.items.map((item) => ({
           price_data: {
             currency: "usd",
             product_data: {
                name: item.name
             },
             unit_amount: item.price * 100,
           },
           quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.status(201).json({success: true , session_url: session.url});
    } catch (error) {
        console.log(error, 'Error in placeOrder controller');
        res.status(404).json({success: false, message: 'Error', error});
    };
};

const verifyOrder = async(req, res) => {
   const {orderId, success} = req.body;

   try {
        if(success == 'true'){
            await OrderModel.findByIdAndUpdate(orderId, {payment: true});
            res.status(201).json({success: true , message: 'Paid'});
        }else{
            await OrderModel.findByIdAndDelete(orderId);
            res.status(404).json({success: false , message: 'Not Paid'});
        };
   } catch (error) {
      console.log(error, 'Error in verifyOrder controller');
      res.status(404).json({success: false, message: 'Error', error});
   };
};

//user orders for frontend
const userOrders = async (req, res) => {
   try {
     const orders = await OrderModel.find({userId: req.body.userId});
     res.status(201).json({success: true , data: orders});

   } catch (error) {
     console.log(error, 'Error in userOrders controller');
     res.status(404).json({success: false, message: 'Error', error});
   };
};

export {placeOrder, verifyOrder, userOrders};