import { Request, Response } from 'express';
import { User } from '../../CollectionDefinition/User';
import dbInsertOne from '../../Util/DatabaseUtil/Insert/InsertOne/getDbInsertResult';
import { ObjectID } from 'mongodb';

import dbReadResultAggregate from '../../Util/DatabaseUtil/Read/getDbReadResultAggregate';

interface Body {
    products: string[];
}

export const createCatalog = async (req: Request, res: Response) => {
    const { _id } = req.user as User;
    const { products } = req.body as Body;
    try {
        const value = {
            userId: _id,
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
        let pipeline = [
            {
                $match: { sellerId: _id }
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
        const orders: any = await dbReadResultAggregate('orders', pipeline);
        res.status(200).json({ success: true, result: orders })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
};

