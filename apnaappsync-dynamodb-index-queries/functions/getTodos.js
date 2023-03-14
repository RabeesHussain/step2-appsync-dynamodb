"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb_1.DocumentClient();
async function getTodos() {
    const params = {
        TableName: process.env.TODOS_TABLE,
    };
    try {
        const data = await docClient.scan(params).promise();
        return data.Items;
    }
    catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}
exports.default = getTodos;
// const params = {
//     TableName: 'process.env.TODOS_TABLE',
//     FilterExpression : "begins_with(#title, :title)",
//     ExpressionAttributeNames: { "#title": "title" },
//     ExpressionAttributeValues: {
//         ':title':"todo"
//     }
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VG9kb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRUb2Rvcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUEwRDtBQUMxRCxNQUFNLFNBQVMsR0FBRyxJQUFJLHlCQUFjLEVBQUUsQ0FBQztBQUV2QyxLQUFLLFVBQVUsUUFBUTtJQUNuQixNQUFNLE1BQU0sR0FBNkI7UUFDckMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBWTtLQUN0QyxDQUFBO0lBQ0QsSUFBSTtRQUNBLE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNuRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7S0FDcEI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDcEMsT0FBTyxJQUFJLENBQUE7S0FDZDtBQUNMLENBQUM7QUFFRCxrQkFBZSxRQUFRLENBQUM7QUFFeEIsbUJBQW1CO0FBQ25CLDRDQUE0QztBQUM1Qyx3REFBd0Q7QUFDeEQsdURBQXVEO0FBQ3ZELG1DQUFtQztBQUNuQywwQkFBMEI7QUFDMUIsUUFBUTtBQUNSLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEb2N1bWVudENsaWVudCB9IGZyb20gXCJhd3Mtc2RrL2NsaWVudHMvZHluYW1vZGJcIjtcbmNvbnN0IGRvY0NsaWVudCA9IG5ldyBEb2N1bWVudENsaWVudCgpO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRUb2RvcygpIHtcbiAgICBjb25zdCBwYXJhbXMgOiBEb2N1bWVudENsaWVudC5TY2FuSW5wdXQ9IHtcbiAgICAgICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi5UT0RPU19UQUJMRSEsXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2NDbGllbnQuc2NhbihwYXJhbXMpLnByb21pc2UoKVxuICAgICAgICByZXR1cm4gZGF0YS5JdGVtc1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnRHluYW1vREIgZXJyb3I6ICcsIGVycilcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFRvZG9zO1xuXG4vLyBjb25zdCBwYXJhbXMgPSB7XG4vLyAgICAgVGFibGVOYW1lOiAncHJvY2Vzcy5lbnYuVE9ET1NfVEFCTEUnLFxuLy8gICAgIEZpbHRlckV4cHJlc3Npb24gOiBcImJlZ2luc193aXRoKCN0aXRsZSwgOnRpdGxlKVwiLFxuLy8gICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczogeyBcIiN0aXRsZVwiOiBcInRpdGxlXCIgfSxcbi8vICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4vLyAgICAgICAgICc6dGl0bGUnOlwidG9kb1wiXG4vLyAgICAgfVxuLy8gfTsiXX0=