import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './configs/db.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send(`This is homepage`);
})

app.post('/products', (req, res) => {
    res.send(`This is homepage`);
})

app.listen(5000, () => {
    connectDB();
    console.log(`Server started at http://localhost:5000`);
})
