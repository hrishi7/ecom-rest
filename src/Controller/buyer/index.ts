import { Request, Response } from 'express';

import dbReadResult from '../../Util/DatabaseUtil/Read/getDbReadResult';
import { User } from '../../CollectionDefinition/User';
import dbInsertOne from '../../Util/DatabaseUtil/Insert/InsertOne/getDbInsertResult';
import { ObjectID } from 'mongodb';
import dbReadResultAggregate from '../../Util/DatabaseUtil/Read/getDbReadResultAggregate';

interface Body {
    products: ObjectID[];
}

/**
 * 
 * @param req 
 * @param res 
 * @access public
 * @returns list of sellers available in this E-commerce marketplace platform
 */
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

/**
 * 
 * @param req , sellerId
 * @param res 
 * @access public
 * @returns get catalog with list of products of requested seller
 */
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

/**
 * 
 * @param req ,
 * @params sellerId,
 * @params catalogId,
 * @params products - array of ids
 * @param res 
 * @access private
 * @description this function help to place an order for the specified seller by authenticated buyer
 * @returns success message
 */

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { sellerId } = req.params;
        const { products, catalogId } = req.body;
        const { _id } = req.user as User;

        const value = {
            buyerId: _id,
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