const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require("cors");
const connectDB = require('./config/db');
const productRouter = require('./routes/productRouter');
const brandRouter = require('./routes/brandRouter');
const authRouter = require('./routes/authRouter');
const categoryRouter = require('./routes/categoryRouter');

dotenv.config();
const app = express();

app.use(cors({
    origin: '*', // Permitir cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
app.use(morgan('combined'));
app.use(express.json());

const port = process.env.PORT;


//routes
app.use('/api/auth', authRouter)
app.use('/', categoryRouter)
app.use('/', productRouter);
app.use('/', brandRouter)


connectDB();

console.log(port);
app.listen(port, ()=>{
    console.log('app corriendo en el puerto: ', port);
})

