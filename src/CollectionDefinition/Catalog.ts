import { ObjectID } from 'mongodb';

export interface Catalog {
    _id: ObjectID;
    userId: ObjectID;
    products: ObjectID[];
    thumbnails?: string;
    createdAt: Date;
    updatedAt: Date;
}
