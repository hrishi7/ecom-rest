import { ObjectID } from 'mongodb';



export interface User {
    _id: ObjectID;
    username: string;
    password: string;
    salt: string;
    type: Type
    createdAt: Date;
}
