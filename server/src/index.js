import express from 'express'
import dotenv, { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    connectDB();
})

