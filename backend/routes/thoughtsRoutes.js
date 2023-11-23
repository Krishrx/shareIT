const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const ThoughtsModel = require("../models/thoughtsModel");

//get all docs in collection
router.get('/', (req, res) => {
    ThoughtsModel.find()
    .then((result) => {
        res.send(result);
    })
    .catch(error => {
        console.error('Error while retrieving data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
})

//get a single doc by id
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    if (isValidObjectId(id)) {
        try {
            const thought = await ThoughtsModel.findById(id);
            if (thought) {
                res.status(200).json(thought);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    else {
        res.status(404).json({ message: 'Id is Invalid' });
    }
})

//add a doc to collection
router.post('/', async (req, res) => {
    try {
        const thought = new ThoughtsModel(req.body);
        const newThought = await thought.save();
        res.status(201).json(newThought);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

//update a doc by id
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    if (isValidObjectId(id)) {
        try {
            const updatedResource = await ThoughtsModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

            if (updatedResource) {
                res.json(updatedResource);
            }
            else {
                res.status(404).json({ message: 'Resource not found' });
            }
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    else {
        res.status(404).json({ message: 'Id is Invalid' });
    }
});

//delete a doc from collection
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (isValidObjectId(id)) {
        try {
            const deletedResource = await ThoughtsModel.findByIdAndDelete(id);

            if (deletedResource) {
                res.status(200).json({ message: 'Content deleted successfully', content: deletedResource });
            }
            else {
                res.status(404).json({ message: 'Resource not found' });
            }
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    else {
        res.status(404).json({ message: 'Id is Invalid' });
    }
});



const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

module.exports = router;