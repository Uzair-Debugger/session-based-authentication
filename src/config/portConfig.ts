import dotenv from 'dotenv'
dotenv.config()

const portConfig: {port: number} = {
    port: Number(process.env.PORT) || 3000,
};

export default portConfig;