import supabase from '@supabase/supabase-js';

class Attendance {
    constructor ({ id, user_id, datetime, device_no, status_id, face_id, confidence_score, status_name } = {})  {
        this.id = id;
        this.user_id = user_id;
        this.datetime = datetime,
        this.device_no = device_no;
        this.status_id = status_id;
        this.face_id = face_id; // Reference to matchd face (users.id)
        this.confidence_score = confidence_score;
        this.status_name = status_name;
    }

    static async all () {
        const { data, error } = await supabase
        .from('attendance')
        .select(`
            id,
            user_id,
            datetime,
            device_no,
            status_id,
            face_id,
            attendance_status:attendance_status(status_name)
        `);

        if (error) throw error;

        return data.map(record => new Attendance ({
            id: record.id,
            user_id: record.user_id,
            datetime: record.datetime,
            device_no: record.device_no,
            status_id: record.status_id,
            face_id: record.face_id,
            status_name: record.attendance_status.status_name
        }));

        
    }

    // Find a record by ID
    static async findById (id) {
        const { data, error } = await supabase
        .from('attendance')
        .select(`
            id,
            user_id,
            datetime,
            device_no,
            status_id,
            face_id,
            attendance_status:attendance_status(status_name)    
        `)
        .eq('id', id)
        .single();

        if (error) throw error;

        return new Attendance ({
            id: data.id,
            user_id: data.user_id,
            datime: data.datime,
            device_no: data.device_no,
            status_id: data.status_id,
            status_name: data.attendance_status.status_name
        });
    }

    // Create attendance record
    static async create ({ user_id, datetime, device_no, status_id, face_id, confidence_score, status_name}) {
        const { data, error } = await supabase
        .from('attendance')
        .insert([{ user_id, datetime, device_no, status_id, face_id, confidence_score, status_name }])
        .select(`
            id,
            user_id,
            datetime,
            device_no,
            status_id,
            face_id,
            confidence_score,
            attendance_status:attendance_status(status_name)    
        `)
        .single();

        if (error) throw error;

        return new Attendance ({
            id: data.id,
            user_id: data.user_id,
            device_no: data.device_no,
            status_id: data.status_id,
            face_id: data.face_id,
            confidence_score: data.confidence_score,
            status_name: data.attendance_status.status_name
        });
    }

    // Update a record 
    static async update (id, updates) {
        const { data, error } = await supabase
        .from('attendance')
        .update(updates)
        .eq('id', id)
        .select(`
            id,
            user_id,
            datetime,
            device_no,
            status_id,
            face_id,
            attendance_status:attendance_status(status_name)    
        `)
        .single();

        if (error) throw error;

        return new Attendance ({
            id: data.id,
            user_id: data.user_id,
            datetime: data.datetime,
            device_no: data.device_no,
            status_id: data.status_id,
            face_id: data.face_id,
            status_name: attendance_status.status_name
        });
    }

    // Delete a record
    static async delete (id) {
        const { data, error } = await supabase.from('attendance').delete().eq('id', id).single();

        if (error) throw error;

        return data;
    }    

}

export default Attendance;