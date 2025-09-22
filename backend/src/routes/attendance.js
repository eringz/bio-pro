import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Time-in
router.post('/timein', async (req, res) => {
    const { employee_id } = req.body;

    try {
        const result = await pool.query('INSERT INTO attendance (employee_id, time_in) VALUES ($1, $2) RETURNING *', [employee_id]);
        res.json(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Database Error for time-in'});
    }

});

// Time-out
router.post('timeout', async (req, res) => {

    // hula ko magiging bug ito pag time out pero check pa rin natin.
    const { attendance_id } = req.body;

    try {
        const result = await pool.query('UPDATE attendance SET time_out = NOW() WHERE id = $1 RETURNING *', [attendance_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Database error for time-out'});
    }
});

// Get logs for employee
router.get('/:employee_id', async (req, res) => {
    const { employee_id } = req.body;

    try {
        const result = await pool.query('SELECT FROM * attendance WHERE employee_id = $1 ORDER BY created_at DESC', employee_id);
        res.status(201).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Database error for employee logs'});
    }
})

export default router;
