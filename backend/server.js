import path from 'path'
import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import uploadRoutes from "./routes/upload.route.js";
import {errorHandler, notFound} from "./middlewares/error.middleware.js";
import connectDb from "./configs/db.js";
import cookieParser from "cookie-parser"
dotenv.config()

//db connection
connectDb()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

//routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.use('/api/config/paypal', (req,res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID
}))

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

//middlewares
app.use(notFound)
app.use(errorHandler)

//server
const port = process.env.PORT || 8888
app.listen(port, () => console.log(`Server started running on port ${port}`.rainbow.underline.bold))