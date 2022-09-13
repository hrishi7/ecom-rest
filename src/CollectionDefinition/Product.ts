import { ObjectID } from 'mongodb';

export interface Product {
    _id: ObjectID;
    name: string;
    price: number;
    images?: string[];
    createdAt?: Date;
}
