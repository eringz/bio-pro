import supabase from '../config/supabase.js';

class User {
    constructor ({id, name, email, role, face_template} = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;    
        this.face_template = face_template;
    }

    static async all () {
        const { data, error } = await supabase.from('users').select('*');
        
        if (error) throw error;
        return data.map(user => new User(user));
    }

    // Find a user by ID
    static async findById (id) {
        const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

        if (error) throw error;
        return new User(data);
    }

    // Create a new User
    static async create (userData) {
        const { data, error } = await supabase.from('users').insert([userData]).select().single();

        if (error) throw error;
        return new User(data);
    }

    // Update a user
    static async update (id, userData) {
        const { data, error } = await supabase.from('users').update(userData).eq('id', id).select().single();

        if (error) throw error;
        return new User(data);
    }

    // Delete a user 
    static async delete (id) {
        const { data, error } = await supabase.from('users').delete().eq('id', id);

        if (error) throw error;
        return data;
    }
    
}

export default User