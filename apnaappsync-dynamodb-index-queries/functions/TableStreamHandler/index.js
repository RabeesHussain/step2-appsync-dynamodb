"use strict";
// import DynamoDB = require("aws-sdk/clients/dynamodb");
exports.handler = async (event) => {
    event.Records.forEach((record) => {
        // let parseRecord = recordParser(record.dynamodb.NewImage);
        console.log('Event Id: %s', record.eventID);
        console.log('Event Id: %s', record.eventName);
        console.log('DynamoDB Record: %j', record.dynamodb);
    });
};
// const recordParser = (ImageRecord: any) => {
//     return DynamoDB.Converter.unmarshall(ImageRecord)
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseURBQXlEO0FBRXpELE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7UUFDbEMsNERBQTREO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFRiwrQ0FBK0M7QUFDL0Msd0RBQXdEO0FBQ3hELElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgRHluYW1vREIgPSByZXF1aXJlKFwiYXdzLXNkay9jbGllbnRzL2R5bmFtb2RiXCIpO1xuXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGV2ZW50LlJlY29yZHMuZm9yRWFjaCgocmVjb3JkOiBhbnkpID0+IHtcbiAgICAgICAgLy8gbGV0IHBhcnNlUmVjb3JkID0gcmVjb3JkUGFyc2VyKHJlY29yZC5keW5hbW9kYi5OZXdJbWFnZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBJZDogJXMnLCByZWNvcmQuZXZlbnRJRCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBJZDogJXMnLCByZWNvcmQuZXZlbnROYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0R5bmFtb0RCIFJlY29yZDogJWonLCByZWNvcmQuZHluYW1vZGIpO1xuICAgIH0pO1xufTtcblxuLy8gY29uc3QgcmVjb3JkUGFyc2VyID0gKEltYWdlUmVjb3JkOiBhbnkpID0+IHtcbi8vICAgICByZXR1cm4gRHluYW1vREIuQ29udmVydGVyLnVubWFyc2hhbGwoSW1hZ2VSZWNvcmQpXG4vLyB9Il19