const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../../controller/shared/loginController');

router.post('/login', loginAdmin);

module.exports = router;
