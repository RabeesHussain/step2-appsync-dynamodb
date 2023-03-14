"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApnaAppsyncDynamodbLambdaDataSourceStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const aws_cdk_lib_2 = require("aws-cdk-lib");
class ApnaAppsyncDynamodbLambdaDataSourceStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const appsyncApi = new appsync.GraphqlApi(this, 'api', {
            name: 'apnaappsync-dynodb-lambda-api',
            schema: appsync.Schema.fromAsset('schema/schema.graphql')
        });
        const todosLambda = new aws_cdk_lib_1.aws_lambda.Function(this, 'AppsyncTodoHandler', {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_12_X,
            handler: 'main.handler',
            code: aws_cdk_lib_1.aws_lambda.Code.fromAsset('functions'),
            memorySize: 1024
        });
        const lambdaDs = appsyncApi.addLambdaDataSource('lambdaDatasource', todosLambda);
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "getTodos"
        });
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "getTodoById"
        });
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "addTodo"
        });
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "deleteTodo"
        });
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "updateTodo"
        });
        const todosTable = new aws_cdk_lib_2.aws_dynamodb.Table(this, 'TodosTable', {
            partitionKey: {
                name: 'id',
                type: aws_cdk_lib_2.aws_dynamodb.AttributeType.STRING,
            },
            billingMode: aws_cdk_lib_2.aws_dynamodb.BillingMode.PAY_PER_REQUEST
        });
        todosTable.grantFullAccess(todosLambda);
        todosLambda.addEnvironment('TODOS_TABLE', todosTable.tableName);
    }
}
exports.ApnaAppsyncDynamodbLambdaDataSourceStack = ApnaAppsyncDynamodbLambdaDataSourceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBuYWFwcHN5bmMtZHluYW1vZGItbGFtYmRhLWRhdGFfc291cmNlLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBuYWFwcHN5bmMtZHluYW1vZGItbGFtYmRhLWRhdGFfc291cmNlLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFzRTtBQUV0RSxzREFBcUQ7QUFDckQsNkNBQXNEO0FBRXRELE1BQWEsd0NBQXlDLFNBQVEsbUJBQUs7SUFDakUsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUNyRCxJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQztTQUMxRCxDQUFDLENBQUE7UUFFRixNQUFNLFdBQVcsR0FBRyxJQUFJLHdCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUNsRSxPQUFPLEVBQUUsd0JBQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsY0FBYztZQUN2QixJQUFJLEVBQUUsd0JBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUN4QyxVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7UUFFSCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFakYsUUFBUSxDQUFDLGNBQWMsQ0FBQztZQUN0QixRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQ3RCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxhQUFhO1NBQ3pCLENBQUMsQ0FBQztRQUdILFFBQVEsQ0FBQyxjQUFjLENBQUM7WUFDdEIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFNBQVM7U0FDckIsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGNBQWMsQ0FBQztZQUN0QixRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsWUFBWTtTQUN4QixDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQ3RCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLElBQUksMEJBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUN4RCxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLDBCQUFRLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDcEM7WUFDRCxXQUFXLEVBQUUsMEJBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZTtTQUNsRCxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3ZDLFdBQVcsQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVsRSxDQUFDO0NBQ0Y7QUF4REQsNEZBd0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMsIGF3c19sYW1iZGEgYXMgbGFtYmRhIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcHBzeW5jLWFscGhhJ1xuaW1wb3J0IHsgYXdzX2R5bmFtb2RiIGFzIGR5bmFtb2RiIH0gZnJvbSAnYXdzLWNkay1saWInXG5cbmV4cG9ydCBjbGFzcyBBcG5hQXBwc3luY0R5bmFtb2RiTGFtYmRhRGF0YVNvdXJjZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGFwcHN5bmNBcGkgPSBuZXcgYXBwc3luYy5HcmFwaHFsQXBpKHRoaXMsICdhcGknLCB7XG4gICAgICBuYW1lOiAnYXBwc3luYy1keW5vZGItbGFtYmRhLWFwaScsXG4gICAgICBzY2hlbWE6IGFwcHN5bmMuU2NoZW1hLmZyb21Bc3NldCgnc2NoZW1hL3NjaGVtYS5ncmFwaHFsJylcbiAgICB9KVxuXG4gICAgY29uc3QgdG9kb3NMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdBcHBzeW5jVG9kb0hhbmRsZXInLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGhhbmRsZXI6ICdtYWluLmhhbmRsZXInLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdmdW5jdGlvbnMnKSxcbiAgICAgIG1lbW9yeVNpemU6IDEwMjRcbiAgICB9KTtcblxuICAgIGNvbnN0IGxhbWJkYURzID0gYXBwc3luY0FwaS5hZGRMYW1iZGFEYXRhU291cmNlKCdsYW1iZGFEYXRhc291cmNlJywgdG9kb3NMYW1iZGEpO1xuXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiUXVlcnlcIixcbiAgICAgIGZpZWxkTmFtZTogXCJnZXRUb2Rvc1wiXG4gICAgfSk7XG5cbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxuICAgICAgZmllbGROYW1lOiBcImdldFRvZG9CeUlkXCJcbiAgICB9KTtcblxuXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJhZGRUb2RvXCJcbiAgICB9KTtcblxuICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXG4gICAgICBmaWVsZE5hbWU6IFwiZGVsZXRlVG9kb1wiXG4gICAgfSk7XG5cbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogXCJNdXRhdGlvblwiLFxuICAgICAgZmllbGROYW1lOiBcInVwZGF0ZVRvZG9cIlxuICAgIH0pO1xuXG4gICAgY29uc3QgdG9kb3NUYWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnVG9kb3NUYWJsZScsIHtcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyxcbiAgICAgIH0sXG4gICAgICBiaWxsaW5nTW9kZTogZHluYW1vZGIuQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNUXG4gICAgfSk7XG5cbiAgICB0b2Rvc1RhYmxlLmdyYW50RnVsbEFjY2Vzcyh0b2Rvc0xhbWJkYSlcbiAgICB0b2Rvc0xhbWJkYS5hZGRFbnZpcm9ubWVudCgnVE9ET1NfVEFCTEUnLCB0b2Rvc1RhYmxlLnRhYmxlTmFtZSk7XG5cbiAgfVxufVxuIl19