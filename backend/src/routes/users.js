import express from 'express';
import Users from '../controllers/Users.js';


const router = express.Router();

router.get('/users', Users.fetchUsers);


export default router;