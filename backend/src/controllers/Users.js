import User from '../models/User.js';

class Users {
    // Fetch all users  
    static async fetchUsers (req, res) {
        try {
            const users = await User.all();
            res.json(users);
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    }
}

export default Users;