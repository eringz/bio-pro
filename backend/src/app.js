    import express from 'express';
    import users from './routes/users.js';
    import attendance from './routes/attendance.js'; 

    const app = express();
    app.use(express.json({ limit: "10mb" }));

    app.use(express.json());
    app.use('/users', users);
    app.use('/attendance', attendance);

    export default app;