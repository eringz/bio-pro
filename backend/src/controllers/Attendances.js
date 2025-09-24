import Attendance from '../models/Attendance.js';
import cv from "opencv4nodejs";

class Attendances {
    // Fetch all attendance records
    static async fetchAttendance (req, res) {
        try {
            const records = await Attendance.all();
            res.json(records);
        } catch (err) {
            res.status(400).json({ error: err.message});
        }
    }

    // Add a new attendance record ( Time in / Time out)
    static async addRecord (req, res) {

        try {
            /**
             * Starting Camera
             */
            const { image } = req.body;

            // Decode base64 -> Buffer -> Mat
            const base64Data = image.replace(/)


            /**
             * Add Record
             * 
             */

            const { user_id, device_no, status_id, face_id, confidence_score } = req.body;
            const datetime = new Date();

            // Optional enforce threshold
            if (confidence_score < 0.9) {
                return res.status(400).json({ error: `Face not recognized! Try Again` });
            }

            const newRecord = await Attendance ({
                user_id,
                datetime,
                device_no,
                status_id,
                face_id,
                confidence_score
            });
        
            res.json(newRecord);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
        
    }

    // Edit a record (cannot change confidence score)
    static async editRecord (req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updateRecord = await Attendance.update(id, updates);

            res.json(updateRecord);

        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Delete a record
    static async removeRecord (req, res) {
        try {
            const { id } = req.params;
            const deleted = await Attendance.delete(id);

            res.json({ message: `Attendance record ${id} deleted`, deleted});
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default Attendances;