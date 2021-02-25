import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import claimsService from '../claims/claims.service';
import { claimCalculation } from '../calculations';

// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
    TableName: 'users'
}
const removeClaims = {
    TableName: 'claims'
}

const userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'username',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'username',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 4
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};

const claimsSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'claimsId',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'claimsId',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'claims',
    StreamSpecification: {
        StreamEnabled: false
    }
};

ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(userSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateUserTable();
                }, 10000);
            }
        });
    }, 5000);
});

function populateUserTable() {
    userService.addUser({username: 'emp', password: 'pass', superPosition: 'sup', first: 'Ashley', last: 'Employee', role: 'Employee', available: 1000, pending: 0, awarded: 0}).then(()=>{});
    userService.addUser({username: 'sup', password: 'pass', superPosition: 'mgr', first: 'Kai', last: 'Supervisor', role: 'Supervisor', available: 1000, pending: 0, awarded: 0}).then(()=>{});
    userService.addUser({username: 'mgr', password: 'pass', first: 'Jake', last: 'Manager', role: 'Manager', available: 1000, pending: 0, awarded: 0}).then(()=>{});
    userService.addUser({username: 'hr', password: 'pass', first: 'Richard', last: 'HR', role: 'HR', available: 1000, pending: 0, awarded: 0}).then(() => {});
}

ddb.deleteTable(removeClaims, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(claimsSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateClaimsTable();
                }, 10000);
            }
        });
    }, 5000);
});

function populateClaimsTable() {
    claimsService.addClaim({claimsId: '111111', usernameRequest: 'emp', requestDetails: [{first: 'Joe', last: 'Employee'}], usernameGiven: 'sup', course: [{description: 'Computer class', courseType: 'Uni', date: '05/01/21-08/15/21', time: '0800', location: '33710', cost: 250, gradingFormat: 'A-F', justification: 'Computers!'}], approval: [{approved: 'Pending', amountApproved: claimCalculation(250, 'Uni')}]}).then(() => {});
    claimsService.addClaim({claimsId: '111112', usernameRequest: 'sup', requestDetails: [{first: 'Scott', last: 'Supervisor'}], usernameGiven: 'mgr', course: [{description: 'Self-help seminar', courseType: 'Sem', date: '03/14/21', time: '1100', location: '32526', cost: 400, gradingFormat: 'Complete/Incomplete', justification: 'I like seminars'}], approval: [{approved: 'Pending', amountApproved: claimCalculation(400, 'Sem')}]}).then(() => {});
    claimsService.addClaim({claimsId: '111113', usernameRequest: 'mgr', requestDetails: [{first: 'Jane', last: 'Manager'}], usernameGiven: 'hr', course: [{description: 'C++ Prep', courseType: 'CertPrep', date: '02/24/21', time: '', location: '33712', cost: 600, gradingFormat: 'Pass/Fail', justification: 'Serious business'}],  approval: [{approved: 'Pending', amountApproved: claimCalculation(600, 'CertPrep')}]}).then(() => {});
}
