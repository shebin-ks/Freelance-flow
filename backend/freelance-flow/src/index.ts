import { AppDataSource } from "./config/data-source";
import app from "./app";

import dotenv from 'dotenv'

dotenv.config()


const PORT = process.env.PORT || 5000
AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running at ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(`DB Connection error: ${err}`);

    })