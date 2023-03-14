"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoByUsernameAndId = void 0;
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb_1.DocumentClient({ apiVersion: '2012-08-10' });
const getTodoByUsernameAndId = async (input) => {
    const { id, username } = input;
    const params = {
        TableName: process.env.TODOS_TABLE,
        KeyConditionExpression: "username = :username",
        FilterExpression: "id = :id",
        ExpressionAttributeValues: {
            ":username": username,
            ":id": id,
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
exports.getTodoByUsernameAndId = getTodoByUsernameAndId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VG9kb0J5VXNlcm5hbWVBbmRJZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRvZG9CeVVzZXJuYW1lQW5kSWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQTBEO0FBQzFELE1BQU0sU0FBUyxHQUFHLElBQUkseUJBQWMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBRzVELE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxFQUFFLEtBQStCLEVBQUUsRUFBRTtJQUM1RSxNQUFNLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUMvQixNQUFNLE1BQU0sR0FBOEI7UUFDdEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBWTtRQUNuQyxzQkFBc0IsRUFBRSxzQkFBc0I7UUFDOUMsZ0JBQWdCLEVBQUUsVUFBVTtRQUM1Qix5QkFBeUIsRUFBRTtZQUN2QixXQUFXLEVBQUUsUUFBUTtZQUNyQixLQUFLLEVBQUUsRUFBRTtTQUNaO0tBQ0osQ0FBQTtJQUNELElBQUk7UUFDQSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3pELE9BQU8sS0FBSyxDQUFBO0tBQ2Y7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDcEMsT0FBTyxJQUFJLENBQUE7S0FDZDtBQUNMLENBQUMsQ0FBQTtBQWxCWSxRQUFBLHNCQUFzQiwwQkFrQmxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRG9jdW1lbnRDbGllbnQgfSBmcm9tICdhd3Mtc2RrL2NsaWVudHMvZHluYW1vZGInO1xuY29uc3QgZG9jQ2xpZW50ID0gbmV3IERvY3VtZW50Q2xpZW50KHsgYXBpVmVyc2lvbjogJzIwMTItMDgtMTAnIH0pO1xuaW1wb3J0IHsgVG9kb0J5VXNlcm5hbWVBbmRJZElucHV0IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IGdldFRvZG9CeVVzZXJuYW1lQW5kSWQgPSBhc3luYyAoaW5wdXQ6IFRvZG9CeVVzZXJuYW1lQW5kSWRJbnB1dCkgPT4ge1xuICAgIGNvbnN0IHsgaWQsIHVzZXJuYW1lIH0gPSBpbnB1dDtcbiAgICBjb25zdCBwYXJhbXM6IERvY3VtZW50Q2xpZW50LlF1ZXJ5SW5wdXQgPSB7XG4gICAgICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuVE9ET1NfVEFCTEUhLFxuICAgICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiBcInVzZXJuYW1lID0gOnVzZXJuYW1lXCIsXG4gICAgICAgIEZpbHRlckV4cHJlc3Npb246IFwiaWQgPSA6aWRcIixcbiAgICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICAgICAgXCI6dXNlcm5hbWVcIjogdXNlcm5hbWUsXG4gICAgICAgICAgICBcIjppZFwiOiBpZCxcbiAgICAgICAgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IEl0ZW1zIH0gPSBhd2FpdCBkb2NDbGllbnQucXVlcnkocGFyYW1zKS5wcm9taXNlKClcbiAgICAgICAgcmV0dXJuIEl0ZW1zXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEeW5hbW9EQiBlcnJvcjogJywgZXJyKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbn0iXX0=