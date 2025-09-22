import express from 'express';
import Users from '../controllers/Users.js';


const router = express.Router();

// Users Route
router.get('/users', Users.fetchUsers);
router.post('/users', Users.addUser);
router.put('/users/:id', Users.editUser);
router.delete('/users/:id', Users.removeUser);

// Attendance Route




export default router;