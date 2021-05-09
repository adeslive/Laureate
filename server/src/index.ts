import express from 'express';
import routes from './routes/routes';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;
const CLIENT = process.env.CALLBACK_URL || 'http://localhost:3000';

async function main() {
    await mongoose.connect('mongodb://localhost/laureate', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    app.use(cors({
        origin: CLIENT,
        credentials: true
    }));

    app.use(routes);

    app.listen(PORT, () => {

    });
}

main();