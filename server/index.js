const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CONNECTION
mongoose.connect(process.env.MONGODB_URI);
mongoose.set('strictQuery', true);

// MIDLEWARES
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
const TodoRoute = require('./routes/Todo');
app.use('/todo', TodoRoute);

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})