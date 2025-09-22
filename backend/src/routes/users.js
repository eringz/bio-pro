import express from 'express';
import Users from '../controllers/Users.js';


const router = express.Router();

// Users Route
router.get('/', Users.fetchUsers);
router.post('/', Users.addUser);
router.get('/:id', Users.getUserById);
router.put('/:id', Users.editUser);
router.put('/:id/face', Users.updateFace);
router.delete('/:id', Users.removeUser);


export default router;