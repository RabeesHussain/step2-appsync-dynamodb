"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoByUsernameAndTitle = void 0;
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb_1.DocumentClient({ apiVersion: '2012-08-10' });
const getTodoByUsernameAndTitle = async (input) => {
    const { title, username } = input;
    const params = {
        TableName: process.env.TODOS_TABLE,
        KeyConditionExpression: '#username = :username and begins_with(#title, :title)',
        ExpressionAttributeNames: {
            "#username": "username",
            "#title": 'title'
        },
        ExpressionAttributeValues: {
            ':username': username,
            ':title': title
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
exports.getTodoByUsernameAndTitle = getTodoByUsernameAndTitle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VG9kb0J5VXNlcm5hbWVBbmRUaXRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRvZG9CeVVzZXJuYW1lQW5kVGl0bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQTBEO0FBQzFELE1BQU0sU0FBUyxHQUFHLElBQUkseUJBQWMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBRzVELE1BQU0seUJBQXlCLEdBQUcsS0FBSyxFQUFFLEtBQWtDLEVBQUUsRUFBRTtJQUNsRixNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsQyxNQUFNLE1BQU0sR0FBOEI7UUFDdEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBWTtRQUNuQyxzQkFBc0IsRUFBRSx1REFBdUQ7UUFDL0Usd0JBQXdCLEVBQUU7WUFDdEIsV0FBVyxFQUFFLFVBQVU7WUFDdkIsUUFBUSxFQUFFLE9BQU87U0FDcEI7UUFDRCx5QkFBeUIsRUFBRTtZQUN2QixXQUFXLEVBQUUsUUFBUTtZQUNyQixRQUFRLEVBQUUsS0FBSztTQUNsQjtLQUNKLENBQUE7SUFDRCxJQUFJO1FBQ0EsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN6RCxPQUFPLEtBQUssQ0FBQTtLQUNmO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3BDLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7QUFFTCxDQUFDLENBQUE7QUF0QlksUUFBQSx5QkFBeUIsNkJBc0JyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvY3VtZW50Q2xpZW50IH0gZnJvbSAnYXdzLXNkay9jbGllbnRzL2R5bmFtb2RiJztcbmNvbnN0IGRvY0NsaWVudCA9IG5ldyBEb2N1bWVudENsaWVudCh7IGFwaVZlcnNpb246ICcyMDEyLTA4LTEwJyB9KTtcbmltcG9ydCB7IFRvZG9CeVVzZXJuYW1lQW5kVGl0bGVJbnB1dCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBnZXRUb2RvQnlVc2VybmFtZUFuZFRpdGxlID0gYXN5bmMgKGlucHV0OiBUb2RvQnlVc2VybmFtZUFuZFRpdGxlSW5wdXQpID0+IHtcbiAgICBjb25zdCB7IHRpdGxlLCB1c2VybmFtZSB9ID0gaW5wdXQ7XG4gICAgY29uc3QgcGFyYW1zOiBEb2N1bWVudENsaWVudC5RdWVyeUlucHV0ID0ge1xuICAgICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRPRE9TX1RBQkxFISxcbiAgICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJyN1c2VybmFtZSA9IDp1c2VybmFtZSBhbmQgYmVnaW5zX3dpdGgoI3RpdGxlLCA6dGl0bGUpJyxcbiAgICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzOiB7XG4gICAgICAgICAgICBcIiN1c2VybmFtZVwiOiBcInVzZXJuYW1lXCIsXG4gICAgICAgICAgICBcIiN0aXRsZVwiOiAndGl0bGUnXG4gICAgICAgIH0sXG4gICAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgICAgICc6dXNlcm5hbWUnOiB1c2VybmFtZSxcbiAgICAgICAgICAgICc6dGl0bGUnOiB0aXRsZVxuICAgICAgICB9XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgSXRlbXMgfSA9IGF3YWl0IGRvY0NsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKVxuICAgICAgICByZXR1cm4gSXRlbXNcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0R5bmFtb0RCIGVycm9yOiAnLCBlcnIpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG59Il19