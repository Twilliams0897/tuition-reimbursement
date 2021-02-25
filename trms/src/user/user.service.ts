import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { User } from './user';

class UserService {
    private doc: DocumentClient;
    constructor() {
        this.doc = dynamo;
    }

    async getUsers(): Promise<User[]> {
        const params = {
            TableName: 'users'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as User[];
        })
    }

    async getUserByUsername(username: string): Promise<User|null> {
        const params = {
            TableName: 'users',
            Key: {
                'username': username
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                logger.debug('Retrieved user');
                return data.Item as User;
            } else {
                logger.error('Failed to get user');
                return null;
            }
        });
    }

    async addUser(user: User): Promise<boolean> {
        const params = {
            TableName: 'users',
            Item: user,
            ConditionExpression: '#u <> :username',
            ExpressionAttributeNames: {
                '#u': 'username'
            },
            ExpressionAttributeValues: {
                ':username': user.username
            }
        };
        return await this.doc.put(params).promise().then((result) => {
            logger.debug('Successfully added user');
            return true;
        }).catch((err) => {
            logger.error('addUser failed: ' + err);
            return false;
        });
    }

    async updateUser(user: User) {
        const params = {
            TableName: 'users',
            Key: {
                'username': user.username
            },
            UpdateExpression: 'set available = :a, pending = :p, awarded = :d',
            ExpressionAttributeValues: {
                ':a': user.available,
                ':p': user.pending,
                ':d': user.awarded
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return await this.doc.update(params).promise().then((data) => {
            logger.debug(data);
            return true;
        }).catch(error => {
            logger.error(error);
            return false;
        });
    }
}

const userService = new UserService;
export default userService;
