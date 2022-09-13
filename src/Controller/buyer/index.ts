import { Request, Response } from 'express';
import { Buffer } from 'buffer';

import dbReadResult from '../../Util/DatabaseUtil/Read/getDbReadResult';
import { User } from '../../CollectionDefinition/User';
import dbInsertOne from '../../Util/DatabaseUtil/Insert/InsertOne/getDbInsertResult';
import { ObjectID } from 'mongodb';
import dbReadResultAggregate from '../../Util/DatabaseUtil/Read/getDbReadResultAggregate';
const crypto = require('crypto');
import dbConnection from '../../Util/DatabaseUtil/getDbConnection';

interface Body {
    products: ObjectID[];
}

export const getListOfSellers = async (req: Request, res: Response) => {
    try {

        const sellers: any = await dbReadResult('users', { type: 'seller' }, { username: 1 });
        res.status(200).json({ success: true, result: sellers })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
};

export const getSellerCatalog = async (req: Request, res: Response) => {
    try {
        const { sellerId } = req.params;
        let pipeline = [
            {
                $match: { userId: new ObjectID(sellerId) }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products",
                    foreignField: "_id",
                    as: "products"
                }
            }
        ]
        const catalog: any = await dbReadResultAggregate('catalogs', pipeline);


        res.status(200).json({ success: true, result: catalog })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { sellerId } = req.params;
        const { products, catalogId } = req.body;
        const { _id } = req.user as User;

        const value = {
            buyerId: new ObjectID(_id),
            sellerId: new ObjectID(sellerId),
            products: products.map((id: string) => new ObjectID(id)),
            catalogId: new ObjectID(catalogId),
        }
        const response_value: any = await dbInsertOne('orders', value);
        res.status(201).json({ success: true, message: 'Order Placed Successfully', result: response_value.ops[0] })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
};