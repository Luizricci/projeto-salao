const express = require('express');
const router = express.Router();
import login from '../controllers/authController';

router.post('/login', login);

export default router;