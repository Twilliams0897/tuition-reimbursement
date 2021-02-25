# TUITION REIMBURSEMENT MANAGEMENT SYSTEM

## Project Description

TRMS, or Tuition Reimbursement Management System is a full-stack web application that allows employees to submit requests for reimbursements for courses, events, and certifications. These requests can then be approved or rejected by the employee's direct supervisor, department head, and a benefits coordinator while the employee is able to track the status of their requests.
## Technologies Used

- React
- Typescript
- JavaScript
- Express.js
- HTML
- CSS
- Redux
- DynamoDB

## Features

List of features ready and TODOs for future development

- The direct supervisor must provide approval and can request additional information from the employee before approval.  
- The department head must provide approval and can request additional information from the employee or direct supervisor before approval.
- The BenCo must provide approval and this stage is not skippable. 
- The BenCo can request additional information from the employee, direct supervisor, or department head before approval. 
- The BenCo must have the ability to alter the reimbursement amount.

To-do list:

- Fix the make a claim screen
- Fix Logout 

## Getting Started

1. `git clone`
2. `npm install --save`
3. While in server folder `npm run setup` to create DynamoDB tables
   - If not in region `us-west-2` change region in `createTable.ts`
4. Setup your DynamoDb database and use `createTable.ts` to populate the database.
6. Create .env using `example.env` in the server folder as a guide.
7. You can run the server locally by doing `npm start` in the trms folder.
8. Once the server is running you can `npm start` in the trms-frontend folder to start the client side.
9. Enjoy

## Usage

To use the app first log in:
![Login](/Screenshots/login.png 'Login')

You will be taken to the Home Screen:
![Home Screen](/Screenshots/home.png 'Home Screen')

Any user can view their claims:
![Claims Screen](/Screenshots/claims.png 'Claims Screen')

Any user can make a claim:
![Claim Form](/Screenshots/make-claim.png 'Claim Form')

HR, Manager, and Supervisor can view the claims assigned to them:
![Claims Details](/Screenshots/claims-details.png 'Claims Details')

HR, Manager, and Supervisor request more information:
![Request Information](/Screenshots/request-information.png 'Request Information')

When done logout:
![Logout](/Screenshots/logout.png 'Logout')

## Contributors

- Tashika Williams
