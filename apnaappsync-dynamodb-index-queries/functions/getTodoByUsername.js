"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoByUsername = void 0;
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb_1.DocumentClient({ apiVersion: '2012-08-10' });
const getTodoByUsername = async (username) => {
    const params = {
        TableName: process.env.TODOS_TABLE,
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
            ":username": username
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
exports.getTodoByUsername = getTodoByUsername;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VG9kb0J5VXNlcm5hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRUb2RvQnlVc2VybmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBMEQ7QUFDMUQsTUFBTSxTQUFTLEdBQUcsSUFBSSx5QkFBYyxDQUFDLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7QUFFNUQsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO0lBQ3hELE1BQU0sTUFBTSxHQUE4QjtRQUN0QyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFZO1FBQ25DLHNCQUFzQixFQUFFLHNCQUFzQjtRQUM5Qyx5QkFBeUIsRUFBRTtZQUN2QixXQUFXLEVBQUUsUUFBUTtTQUN4QjtLQUNKLENBQUE7SUFDRCxJQUFJO1FBQ0EsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN6RCxPQUFPLEtBQUssQ0FBQTtLQUNmO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3BDLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7QUFDTCxDQUFDLENBQUE7QUFmWSxRQUFBLGlCQUFpQixxQkFlN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEb2N1bWVudENsaWVudCB9IGZyb20gJ2F3cy1zZGsvY2xpZW50cy9keW5hbW9kYic7XG5jb25zdCBkb2NDbGllbnQgPSBuZXcgRG9jdW1lbnRDbGllbnQoeyBhcGlWZXJzaW9uOiAnMjAxMi0wOC0xMCcgfSk7XG5cbmV4cG9ydCBjb25zdCBnZXRUb2RvQnlVc2VybmFtZSA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgcGFyYW1zOiBEb2N1bWVudENsaWVudC5RdWVyeUlucHV0ID0ge1xuICAgICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRPRE9TX1RBQkxFISxcbiAgICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogXCJ1c2VybmFtZSA9IDp1c2VybmFtZVwiLFxuICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAgICAgICBcIjp1c2VybmFtZVwiOiB1c2VybmFtZVxuICAgICAgICB9XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgSXRlbXMgfSA9IGF3YWl0IGRvY0NsaWVudC5xdWVyeShwYXJhbXMpLnByb21pc2UoKVxuICAgICAgICByZXR1cm4gSXRlbXNcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0R5bmFtb0RCIGVycm9yOiAnLCBlcnIpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxufSJdfQ==