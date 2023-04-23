const express = require('express');
const router = new express.Router();
const { createList, getLists, getListById, updateList, deleteList, } = require('../controllers/listController.js');

// Lists Create APIs
router.post('', (req, res) => {
    createList(req, res);
})

// Lists Get by User ID API
router.get('', (req, res) => {
    getLists(req, res);
});

// Lists Get by List ID API
router.get('/:id', (req, res) => {
    getListById(req, res);
});

// Lists Update API
router.patch('/:id', (req, res) => {
    updateList(req, res);
})

// Lists Delete API
router.delete('/:id', (req, res) => {
    deleteList(req, res);
})

module.exports = router;