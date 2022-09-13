import { Request, Response, NextFunction } from 'express';
import dbReadResult from '../Util/DatabaseUtil/Read/getDbReadResult';
import { ObjectID } from 'mongodb'
import { Catalog } from '../CollectionDefinition/Catalog';

//Protect route
export const validateOrderRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { sellerId } = req.params;
    const { products, catalogId } = req.body;

    if (!sellerId) {
        return res.status(400).json({ success: false, message: 'sellerId is required' })
    }
    if (!catalogId) {
        return res.status(400).json({ success: false, message: 'catalogId is required' })
    }
    if (!products || products.length == 0) {
        return res.status(400).json({ success: false, message: 'you must have to select at least one product to place order' })

    }

    try {

        const catalog = await dbReadResult('catalogs', { _id: new ObjectID(catalogId) }) as unknown as Catalog[];

        if (!catalog || catalog.length == 0) {
            return res.status(400).json({ success: false, message: 'catalog not found' })
        }
        let catalogProducts = catalog[0].products.map(p => p.toString())

        products.forEach((product: string) => {
            if (!catalogProducts.includes(product)) {
                return res.status(400).json({ success: false, message: 'Please select only products from one catalog in one order' })
            }
        });
        next();

    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error' });
    }
};