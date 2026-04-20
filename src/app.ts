import express from 'express';
import cors from 'cors';
import sequelize from './config/dbConfig.js';
import User from './models/user.model.js';
import portConfig from './config/portConfig.js';
import {authRouter} from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRouter);

(async()=>{
    try{
        await sequelize.authenticate();
        console.log(`Database Connected Successfully!`);

        await sequelize.sync();
        console.log(`DB synced Successfully!`)
    }
    catch(error){
        console.log(`Unable to connect to DB. \nError: ${error}`)
    }
})();

// ================================================================================
app.get('/',(req, res)=>{
    res.json({"Status": `Server is up and running`})
})
// ================================================================================
app.listen(portConfig.port,()=>{
    console.log(`Server is up and running on http://localhost:${portConfig.port}`)
})