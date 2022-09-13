import { ObjectID } from 'mongodb';

export interface Order {
    _id: ObjectID;
    buyerId: ObjectID;
    sellerId: ObjectID;
    products: ObjectID[];
    catalogId: ObjectID;
    createdAt?: Date;
    updatedAt?: Date;
    orderedOn?: Date;
}
