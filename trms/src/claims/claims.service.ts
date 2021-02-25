import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Claims } from './claims';

class ClaimsService {
    private doc: DocumentClient;
    constructor() {
        this.doc = dynamo;
    }

    async getClaims(): Promise<Claims[]> {
        const params = {
            TableName: 'claims'
        }

        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as Claims[];
        }).catch((err) => {
            logger.error('Failed to retrieve list: ' + err);
            return [];
        });
    }

    async getClaimById(claimsId: string): Promise<Claims | null> {
        const params = {
            TableName: 'claims',
            Key: {
                'claimsId': claimsId
            }
        };

        return await this.doc.get(params).promise().then((data) => {
            return data.Item as Claims;
        }).catch((err) => {
            logger.error('Failed to retrieve');
            return null;
        });
    }

    async addClaim(claims: Claims): Promise<boolean> {

        logger.debug(claims);
        const params = {
            TableName: 'claims',
            Item: claims,
            ConditionExpression: '#claimsId <> :claimsId',
            ExpressionAttributeNames: {
                '#claimsId': 'claimsId'
            },
            ExpressionAttributeValues: {
                ':claimsId': claims.claimsId
            }
        }

        return await this.doc.put(params).promise().then(() => {
            logger.debug('Successfully added request');
            return true;
        }).catch((err) => {
            logger.error('Failed to add request: ' + err);
            return false;
        });
    }

    async updateClaim(claims: Claims): Promise<boolean> {
        const params = {
            TableName: 'claims',
            Key: {
                'claimsId': claims.claimsId
            },
            UpdateExpression: 'set #requestDetails = :r, #usernameGiven = :u, #course = :c, #approval = :a',
            ExpressionAttributeValues: {
                ':r': claims.requestDetails,
                ':u': claims.usernameGiven,
                ':c': claims.course,
                ':a': claims.approval
            },
            ExpressionAttributeNames: {
                '#requestDetails': 'requestDetails',
                '#usernameGiven': 'usernameGiven',
                '#course': 'course',
                '#approval': 'approval'
            },
            ReturnValues: 'UPDATED_NEW'
        };

        return await this.doc.update(params).promise().then(() => {
            logger.debug('Successfully updated');
            return true;
        }).catch((err) => {
            logger.error('Failed to update request: ' + err);
            return false;
        });
    }

    async deleteClaim(claimsId: string): Promise<boolean> {
        const params = {
            TableName: 'claims',
            Key: {
                'claimsId': claimsId
            }
        }

        return await this.doc.delete(params).promise().then((result) => {
            logger.debug('Succesfully removed');
            return true;
        }).catch((err) => {
            logger.error('Failed to remove: ', err);
            return false;
        });
    }

}

const claimsService = new ClaimsService();
export default claimsService;
