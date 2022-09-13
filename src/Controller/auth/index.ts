import { Request, Response } from 'express';
import { Buffer } from 'buffer';
import sha1 from 'sha1';
import jwt from 'jsonwebtoken';

import dbReadResult from '../../Util/DatabaseUtil/Read/getDbReadResult';
import { User } from '../../CollectionDefinition/User';
import dbInsertOne from '../../Util/DatabaseUtil/Insert/InsertOne/getDbInsertResult';
const crypto = require('crypto');
import config from 'config';

interface Body {
    username: string;
    password: string;
    type?: string;
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body as Body;
    const query = { username: username };
    try {
        let users: User[] = await dbReadResult('users', query);
        let user = users[0];
        if (users.length === 0) {
            res.json({
                success: false,
                message: 'Username or password not correct'
            }); //user does not found
        } else {
            let hash_binary = sha1(password + user.salt, { asString: true });
            let encrypted_password = Buffer.from(
                hash_binary + user.salt,
                'binary'
            ).toString('base64');
            if (encrypted_password !== user.password) {
                res.json({
                    success: false,
                    message: 'Username or password not correct'
                });
            } else {
                //payload to be set in jwt
                const payload = {
                    user_id: user._id,
                    name: user.username,
                    type: user.type
                };
                let expiresInObj: { expiresIn?: string } = {};

                expiresInObj.expiresIn = '1 days';

                jwt.sign(
                    payload,
                    config.get('secret'),
                    expiresInObj,
                    (err, token) => {
                        if (err) {
                            res.status(500).json({
                                success: false,
                                message: 'error in creating token.'
                            });
                        } else {
                            res.status(200).json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        }
                    }
                );
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
};

export const register = async (req: Request, res: Response) => {
    const { username, password, type } = req.body as Body;
    try {
        const { encrypted, salt_value } = hashSSHA(password);
        const value = {
            username,
            password: encrypted,
            type,
            salt: salt_value
        }
        const response_value: any = await dbInsertOne('users', value);
        res.status(201).json({ success: true, message: 'Signed Up Successfully', result: response_value.ops[0] })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
};

//fn -> hashSSHA, hash user input password(string) to encrypted password
//with salt of SHA1 mechanism.
const hashSSHA = (password: string) => {
    let salt = crypto
        .createHash('sha1')
        .update(crypto.randomBytes(8))
        .digest('base64');
    salt = salt.substring(0, 10);
    const hash = crypto.createHash('sha1');
    hash.update(password + salt);
    return {
        salt_value: salt,
        encrypted: Buffer.concat([hash.digest(), Buffer.from(salt)]).toString(
            'base64'
        )
    };
};