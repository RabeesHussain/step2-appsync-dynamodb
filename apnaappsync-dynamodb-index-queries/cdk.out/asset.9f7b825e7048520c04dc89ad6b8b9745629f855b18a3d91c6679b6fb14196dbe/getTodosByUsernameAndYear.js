"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodosByUsernameAndYear = void 0;
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb_1.DocumentClient({ apiVersion: '2012-08-10' });
const getTodosByUsernameAndYear = async (input) => {
    const { year, username } = input;
    const params = {
        TableName: process.env.TODOS_TABLE,
        IndexName: process.env.TODOS_YEAR_INDEX,
        KeyConditionExpression: '#username = :username and #year = :year',
        ExpressionAttributeNames: {
            "#username": "username",
            "#year": 'year'
        },
        ExpressionAttributeValues: {
            ':username': username,
            ':year': year
        }
    };
    try {
        const { Items } = await docClient.query(params).promise();
        return Items;
    }
    catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
};
exports.getTodosByUsernameAndYear = getTodosByUsernameAndYear;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VG9kb3NCeVVzZXJuYW1lQW5kWWVhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRvZG9zQnlVc2VybmFtZUFuZFllYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQTBEO0FBQzFELE1BQU0sU0FBUyxHQUFHLElBQUkseUJBQWMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBRzVELE1BQU0seUJBQXlCLEdBQUcsS0FBSyxFQUFFLEtBQWtDLEVBQUUsRUFBRTtJQUNsRixNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNqQyxNQUFNLE1BQU0sR0FBOEI7UUFDdEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBWTtRQUNuQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBaUI7UUFDeEMsc0JBQXNCLEVBQUUseUNBQXlDO1FBQ2pFLHdCQUF3QixFQUFFO1lBQ3RCLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLE9BQU8sRUFBRSxNQUFNO1NBQ2xCO1FBQ0QseUJBQXlCLEVBQUU7WUFDdkIsV0FBVyxFQUFFLFFBQVE7WUFDckIsT0FBTyxFQUFFLElBQUk7U0FDaEI7S0FDSixDQUFBO0lBQ0QsSUFBSTtRQUNBLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDekQsT0FBTyxLQUFLLENBQUE7S0FDZjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNwQyxPQUFPLElBQUksQ0FBQTtLQUNkO0FBRUwsQ0FBQyxDQUFBO0FBdkJZLFFBQUEseUJBQXlCLDZCQXVCckMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEb2N1bWVudENsaWVudCB9IGZyb20gJ2F3cy1zZGsvY2xpZW50cy9keW5hbW9kYic7XG5jb25zdCBkb2NDbGllbnQgPSBuZXcgRG9jdW1lbnRDbGllbnQoeyBhcGlWZXJzaW9uOiAnMjAxMi0wOC0xMCcgfSk7XG5pbXBvcnQgeyBUb2Rvc0J5VXNlcm5hbWVBbmRZZWFySW5wdXQgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgZ2V0VG9kb3NCeVVzZXJuYW1lQW5kWWVhciA9IGFzeW5jIChpbnB1dDogVG9kb3NCeVVzZXJuYW1lQW5kWWVhcklucHV0KSA9PiB7XG4gICAgY29uc3QgeyB5ZWFyLCB1c2VybmFtZSB9ID0gaW5wdXQ7XG4gICAgY29uc3QgcGFyYW1zOiBEb2N1bWVudENsaWVudC5RdWVyeUlucHV0ID0ge1xuICAgICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRPRE9TX1RBQkxFISxcbiAgICAgICAgSW5kZXhOYW1lOiBwcm9jZXNzLmVudi5UT0RPU19ZRUFSX0lOREVYISxcbiAgICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJyN1c2VybmFtZSA9IDp1c2VybmFtZSBhbmQgI3llYXIgPSA6eWVhcicsXG4gICAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAgICAgICAgICAgXCIjdXNlcm5hbWVcIjogXCJ1c2VybmFtZVwiLFxuICAgICAgICAgICAgXCIjeWVhclwiOiAneWVhcidcbiAgICAgICAgfSxcbiAgICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICAgICAgJzp1c2VybmFtZSc6IHVzZXJuYW1lLFxuICAgICAgICAgICAgJzp5ZWFyJzogeWVhclxuICAgICAgICB9XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgSXRlbXMgfSA9IGF3YWl0IGRvY0NsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKVxuICAgICAgICByZXR1cm4gSXRlbXNcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0R5bmFtb0RCIGVycm9yOiAnLCBlcnIpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG59Il19