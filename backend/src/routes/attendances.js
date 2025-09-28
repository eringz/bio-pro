import express from 'express';
import Attendances from '../controllers/Attendances.js';

const router = express.Router();

router.get('/', Attendances.fetchAttendance);
router.get('/date/:date', Attendances.fetchByDate); 
router.post('/', Attendances.addRecord);
router.put('/:id', Attendances.editRecord);
router.delete('/:id', Attendances.removeRecord);

export default router;