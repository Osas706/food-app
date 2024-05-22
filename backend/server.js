import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food.route.js";


//app config
const app = express();
const port = 4000;


//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));

app.get("/", (req, res) => {
   res.send('HEllo')
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});


//mongodb+srv://food-app:<password>@cluster0.wbuguuo.mongodb.net/?