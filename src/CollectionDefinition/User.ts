import { ObjectID } from 'mongodb';

enum Type { 'buyer', 'seller' }

export interface User {
    _id: ObjectID;
    username: string;
    password: string;
    salt: string;
    type: Type
    createdAt: Date;
}
