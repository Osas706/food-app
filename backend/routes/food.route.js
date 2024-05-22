import express from 'express';
import multer from 'multer';
import { addFood , listFood, removeFood} from '../controllers/food.controller.js';

const router = express.Router();


//image storage to uploads folder using multer
const storage = multer.diskStorage({
    destination : 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
});
const upload = multer({storage: storage});


//routes
router.post("/add", upload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove", removeFood);



export default router;