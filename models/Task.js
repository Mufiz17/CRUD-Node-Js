const mongoose = require('mongoose');

// create schemes
const taskScheme = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Title is required'],
        trim: true, 
    },
    description: {
        type: String,
        trim: true, 
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// create model based on the schema
const task = mongoose.model('Task', taskScheme);

// export the model
module.exports = task;