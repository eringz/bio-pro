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

    // Add a new user
    static async addUser (req, res) {
        try {
            const { name, email, role } = req.body;
            const newUser = await User.create({name, email, role});
            res.json(newUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Edit an existing user
    static async editUser (req, res) {
        try {
            const { id } = req.params;
            const {name, email, role} = req.body;
            const updateUser = await User.update(id, { name, email, role });

            res.json(updateUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Remove a user
    static async removeUser (req, res) {
        try {
            const { id } = req.body;
            const { name } = await User.findById(id);

            await User.delete(id);

            res.json({ message: `${name} deleted`, name});
        } catch {
            res.status(400).json({ error: err.message });
        }
    }
}

export default Users;