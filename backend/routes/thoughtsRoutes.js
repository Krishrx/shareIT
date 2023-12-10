const express = require('express');
const router = express.Router();
const thoughtsController = require('../controllers/thoughtsController')
const requireAuth = require('../middleware/requireAuth')

//middleware to authenticate user
router.use(requireAuth);

//get all docs in collection
router.get('/', thoughtsController.getThoughts)

//get a single doc by id
router.get('/:id', thoughtsController.getThoughtsById)

//add a doc to collection
router.post('/', thoughtsController.createThought)

//update a doc by id
router.patch('/:id', thoughtsController.updateThought);

//delete a doc from collection
router.delete('/:id',thoughtsController.deleteThought);

module.exports = router;