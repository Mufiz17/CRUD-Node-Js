const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middleware 
app.use(cors());
app.use(bodyParser.json());

// port
const port = process.env.PORT || 3000;

// endpoints untuk cek server
app.get('/', (req, res) => {
    res.send('API is running...')
});

// runing server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// connect to mongoose server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB...');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})

// Route routes
const routes = require('./routes/tasksRoutes');
app.use('/api', routes);
