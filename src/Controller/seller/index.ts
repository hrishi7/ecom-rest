import { Request, Response } from 'express';
import { Buffer } from 'buffer';

import dbReadResult from '../../Util/DatabaseUtil/Read/getDbReadResult';
import { User } from '../../CollectionDefinition/User';
import dbInsertOne from '../../Util/DatabaseUtil/Insert/InsertOne/getDbInsertResult';
import { ObjectID } from 'mongodb';
const crypto = require('crypto');

interface Body {
    products: string[];
}

export const createCatalog = async (req: Request, res: Response) => {
    const { _id } = req.user as User;
    const { products } = req.body as Body;
    try {
        const value = {
            userId: new ObjectID(_id),
            products: products.map(id => new ObjectID(id))
        }
        const response_value: any = await dbInsertOne('catalogs', value);
        res.status(201).json({ success: true, message: 'Your Catalog Created Successfully', result: response_value.ops[0] })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    const { _id } = req.user as User;
    try {
        const orders: any = await dbReadResult('orders', { sellerId: new ObjectID(_id) });
        res.status(201).json({ success: true, result: orders })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
};

