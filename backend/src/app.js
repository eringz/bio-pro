    import express from 'express';
    import cors from "cors";
    import users from './routes/users.js';
    import attendances from './routes/attendances.js'; 

    const app = express();
    app.use(express.json({ limit: "10mb" }));
    // app.use(cors({
    //     origin: "http://localhosst:3000",
    //     methods: ["GET", "POST"]
    // }));
    app.use(cors());

    app.use(express.json());
    app.use('/users', users);
    app.use('/attendances', attendances);

    export default app;