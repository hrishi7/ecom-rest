import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import dbReadResult from '../Util/DatabaseUtil/Read/getDbReadResult';
import { ObjectID } from 'mongodb'

//Protect route
export const validateRegisterRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, type } = req.body as { username: string, password: string, type: string }

    if (!username || !password || !type) {
        return res.status(400).json({ success: false, message: 'username, password, type is required' })
    }

    if (!(type in Type)) {
        return res.status(400).json({ success: false, message: 'invalid type' })
    }
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if (!regex.test(password)) {
        return res.status(400).json({ success: false, message: 'Password should contain 1 uppercase, 1 lowercase, 1 special character, 1 digit and minimum eight character long' })
    }


    try {

        const userExist = await dbReadResult('users', { username });

        if (userExist) {
            return res.status(400).json({ success: false, message: 'username already used. Please try another one.' })
        }
        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'internal server error' });
    }
};

export const validateLoginRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body as { username: string, password: string }

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'username, password is required' })
    }
    next();
};