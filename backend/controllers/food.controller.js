import FoodModel from '../models/food.model.js';
import fs from 'fs';

//add food item
const addFood = async (req, res) => {
   let image_filename = `${req.file.filename}`;

   const food = new FoodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
   });

   try {
    await food.save();
    res.status(201).json({success: true, message: 'Food Added'});
   } catch (error) {
    console.log(error, 'Error in addFood controller');
    res.status(404).json({success: false, message: 'Error', error});
   };
};

//list all food 
const listFood = async (req, res) => {
   try {
    const foods = await FoodModel.find({});
    res.status(201).json({success: true, data: foods});
   } catch (error) {
    console.log(error, 'Error in listFood controller');
    res.status(404).json({success: false, message: 'Error', error})
   };
};

//remove food item 
const removeFood = async (req, res) => {
    try {
        const food = await FoodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {}); // to delete the image from folder

        await FoodModel.findByIdAndDelete(req.body.id);

        res.status(201).json({success: true, message: 'Food Removed'});
    } catch (error) {
      console.log(error, 'Error in removeFood controller');
      res.status(404).json({success: false, message: 'Error', error})
    };
};

export { addFood, listFood, removeFood };