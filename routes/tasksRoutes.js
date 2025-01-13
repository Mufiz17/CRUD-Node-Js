const express = require('express');
const tasks = require('../models/Task');
const router = express.Router();

// Read
router.get('/tasks', async (req, res) => {
    try {
        const tasksList = await tasks.find();
        res.status(200).json(tasksList);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Create
router.post('/tasks', async (req, res) => {
    try {
        const newTask = new tasks(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(
            {
                message: 'Task saved successfully',
                data: savedTask
            });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update
router.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await tasks.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(
            {
                message: 'Task updated successfully',
                data: updatedTask
            });
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
});

// Delete
router.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await tasks.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(
            {
                message: 'Task successfully deleted',
            });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Get by Id
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await tasks.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(
            {
                message: 'Task found',
                data: task
            });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;