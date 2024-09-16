const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require("cors");
const connectDB = require('./config/db');
const productRouter = require('./routes/productRouter');
const brandRouter = require('./routes/brandRouter');
const authRouter = require('./routes/authRouter');
const categoryRouter = require('./routes/categoryRouter');
const movementRouter = require('./routes/movementRouter');
const saleRouter = require('./routes/saleRouter');
const salesMovementRouter = require('./routes/salesMovementRouter');

dotenv.config();
const app = express();

app.use(cors({
    origin: '*', // Permitir cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  }));
app.use(morgan('combined'));
app.use(express.json());

const port = process.env.PORT;


//routes
app.use('/api/auth', authRouter)
app.use('/', categoryRouter)
app.use('/', productRouter);
app.use('/', brandRouter);
app.use('/', movementRouter);
app.use('/', saleRouter);
app.use('/', salesMovementRouter);

connectDB();

console.log(port);
app.listen(port, ()=>{
    console.log('App corriendo en el puerto: ', port);
})

