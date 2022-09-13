import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import dbReadResult from '../Util/DatabaseUtil/Read/getDbReadResult';
import { ObjectID } from 'mongodb'

//Protect route
export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    //set token from bearer token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    //Make sure token exists
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorize to access this route' });
    }
    try {
        //verify token
        const decoded: any = jwt.verify(token, config.get('secret'));


        const user = await dbReadResult('users', { _id: new ObjectID(decoded.user_id) });

        req.user = user[0];
        next();

    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorize to access this route' });
    }
};