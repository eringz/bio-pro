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

    // Get users by Id
    static async getUserById (req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            res.json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Add a new user
    static async addUser (req, res) {
        try {
            const { first_name, last_name, middle_name, email_address, contact_number, role, face_template } = req.body;
            console.log('Incoming Users Controller: ', req.body);
            console.log(`Face Template: ${face_template}`);
            const newUser = await User.create({ first_name, middle_name, last_name, email_address, contact_number, role, face_template });
            res.json(newUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Edit an existing user
    static async editUser (req, res) {
        try {
            const { id } = req.params;
            const {first_name, middle_name, last_name, email_address, contact_number, role} = req.body;
            const updateUser = await User.update(id, { first_name, middle_name, last_name, email_address, contact_number, role });

            res.json(updateUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Remove a user
    static async removeUser (req, res) {
        try {
            const { id } = req.body;
            const { first_name } = await User.findById(id);

            await User.delete(id);

            res.json({ message: `${first_name} deleted`});
        } catch {
            res.status(400).json({ error: err.message });
        }
    }

    // Optional: update face template separately
    static async updateFace (req, res) {
        try {
            const { id } = req.params;
            const { face_template } = req.body;
            const updateUser = await User.update(id, { face_template });
            res.json(updateUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default Users;