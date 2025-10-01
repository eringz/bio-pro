import supabase from '../config/supabase.js';

class Attendance {
    constructor ({ id, user_id, first_name, last_name,  datetime, device_no, status_id, face_id, confidence_score, status_name } = {})  {
        this.id = id;
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.datetime = datetime,
        this.device_no = device_no;
        this.status_id = status_id;
        this.face_id = face_id; // Reference to matchd face (users.id)
        this.confidence_score = confidence_score;
        this.status_name = status_name;
    }

    static async all () {
        const { data, error } = await supabase
        .from('attendances')
        .select(`
            id,
            user_id,
            datetime,
            device_no,
            status_id:attendance_status(id),
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

        // Find records by date (yyyy-mm-dd)
        static async findByDate(date) {
            const manilaStart = new Date(`${date}T00:00:00+08:00`);
            const manilaEnd = new Date(`${date}T23:59:59+08:00`);
            
            // Convert to UTC ISO string
            const utcStart = manilaStart.toISOString(); // e.g., 2025-09-30T16:00:00.000Z
            const utcEnd = manilaEnd.toISOString();  

            const { data, error } = await supabase
                .from('attendances')
                .select(`
                    id,
                    user_id,
                    datetime,
                    device_no,
                    status_id:attendance_status(id),
                    face_id,
                    attendance_status:attendance_status(status_name),
                    users!inner(first_name,last_name)      
                `)
                .gte('datetime', `${utcStart}`)  // start of day
                .lte('datetime', `${utcEnd}`); // end of day

            if (error) throw error;


            return data.map(record => new Attendance({
                id: record.id,
                user_id: record.user_id,
                datetime: record.datetime,
                device_no: record.device_no,
                status_id: record.status_id,
                face_id: record.face_id,
                status_name: record.attendance_status.status_name,
                first_name: record.users?.first_name,
                last_name: record.users?.last_name
            }));
        }

    // Find a record by ID
    static async findById (id) {
        const { data, error } = await supabase
        .from('attendances')
        .select(`
            id,
            user_id,
            datetime,
            device_no,
            status_id:attendance_status(id),
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
    static async create ({ user_id, datetime, device_no, status_id, face_id, confidence_score}) {
        const { data, error } = await supabase
        .from('attendances')
        .insert([{ user_id, datetime, device_no, status_id, face_id, confidence_score }])
        .select()
        .single();

        if (error) throw error;

        return new Attendance (data);
    }

    // Update a record 
    static async update (id, updates) {
        const { data, error } = await supabase
        .from('attendances')
        .update(updates)
        .eq('id', id)
        .select(`
            id,
            user_id,
            datetime,
            device_no,
            status_id:attendance_status(id),
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
        const { data, error } = await supabase.from('attendances').delete().eq('id', id).single();

        if (error) throw error;

        return data;
    }    

}

export default Attendance;