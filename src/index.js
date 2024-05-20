import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import mongoose from "mongoose";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = Express();

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const PORT = process.env.PORT || 3001;

// Sử dụng middleware CORS
app.use(cors());
// Cau hinh static file
app.use(Express.static(path.join(__dirname, '../uploads')));


app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

routes(app);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is runing on http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Can't connecting to MongoDB: ", error.message);
    })

