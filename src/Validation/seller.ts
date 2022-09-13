import { Request, Response, NextFunction } from 'express';
import dbReadResult from '../Util/DatabaseUtil/Read/getDbReadResult';
import { ObjectID } from 'mongodb'
import { Catalog } from '../CollectionDefinition/Catalog';
import { User } from '../CollectionDefinition/User';

//Protect route
export const validateCreateCatalogRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.user as User;
    const { products } = req.body;

    if (!products || products.length == 0) {
        return res.status(400).json({ success: false, message: 'products can\'t be empty' })
    }

    try {

        const catalog = await dbReadResult('catalogs', { userId: new ObjectID(_id) }) as unknown as Catalog[];

        if (catalog && catalog.length > 0) {

            return res.status(400).json({ success: false, message: 'catalog already exist for this seller!' })
        }

        next();

    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error' });
    }
};