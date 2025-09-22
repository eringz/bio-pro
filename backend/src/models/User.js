import supabase from '../config/supabase.js';

class User {
    constructor ({id, name, email, role} = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;    
    }

    static async all () {
        const { data, error } = await supabase.from('employees').select('*');
        if (error) throw error;

        return data.map(user => new User(user));
    }
    
}

export default User