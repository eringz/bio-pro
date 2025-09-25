import Attendance from '../models/Attendance.js';
import FaceService from "../services/Face.js";

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

            const { user_id, face_id, device_no, status_id, image } = req.body;
            const datetime = new Date();

            if (!image) {
                return res.status(400).json({error: "Image is required"});
            }

            // Detect face (AI Service)
            const { detected, confidence } = await FaceService.detectFace(image);

            if (!detected || confidence < 0.9) {
                return res.status(400).json({ error: "Face not recognized!"});
            }

            const newRecord = await Attendance.create({
                user_id,
                datetime,
                device_no,
                status_id,
                face_id,
                confidence_score: confidence,
            });
        
            res.json(newRecord);
        } catch (err) {
            res.status(400).json({ error: `Attendances addRecord Error ${err.message}` });
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