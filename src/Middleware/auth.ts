import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import dbReadResult from '../Util/DatabaseUtil/Read/getDbReadResult';
import { ObjectID } from 'mongodb'

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @description this is middleware function to check whether user is authenticated or not 
 */
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

        if (!user || user.length == 0) return res.status(400).json({ success: false, message: 'User not found! or Invalid Authentication Token' })

        req.user = user[0];
        next();

    } catch (error) {
        return res.status(401).json({ success: false, message: 'internal server error' });
    }
};