import logger from './../log';
import userService from './user.service';

export interface User {
    username: string;
    password: string;
    superPosition?: string;
    first: string;
    last: string;
    role: string;
    available: number;
    pending: number;
    awarded: number;
}

export async function login(username: string, password: string): Promise<User|null> {
    logger.debug(`Attempted login -> username: '${username}' and password: '${password}'`);
    return await userService.getUserByUsername(username).then((user) => {
        if (user && user.password === password) {
            logger.debug('Successful login');
            return user;
        } else {
            logger.error('Login Failed');
            return null;
        }
    })
}
