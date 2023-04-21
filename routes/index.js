const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => { res.send('Hello Express!') });

module.exports = router;