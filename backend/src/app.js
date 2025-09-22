    import express from 'express';
    import users from './routes/users.js';

    const app = express();

    app.use(express.json());
    app.use('/api', users);

    export default app;