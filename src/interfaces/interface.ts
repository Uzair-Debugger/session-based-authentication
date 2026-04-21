import 'express-session'

export interface signUpInterface{
    name: string;
    email: string;
    password: string;
}

declare module "express-session"{
    interface SessionData{
        userId: number;
    }
}