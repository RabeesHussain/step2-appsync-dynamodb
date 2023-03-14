"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApnaAppsyncDynamodbIndexQueriesStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const aws_cdk_lib_2 = require("aws-cdk-lib");
const aws_lambda_event_sources_1 = require("aws-cdk-lib/aws-lambda-event-sources");
class ApnaAppsyncDynamodbIndexQueriesStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const appsyncApi = new appsync.GraphqlApi(this, 'api', {
            name: 'appsync-dynodb-query-api',
            schema: appsync.Schema.fromAsset('schema/schema.graphql')
        });
        const todosTable = new aws_cdk_lib_2.aws_dynamodb.Table(this, 'TodosTable', {
            partitionKey: {
                name: 'username',
                type: aws_cdk_lib_2.aws_dynamodb.AttributeType.STRING,
            },
            sortKey: {
                name: 'title',
                type: aws_cdk_lib_2.aws_dynamodb.AttributeType.STRING
            },
            billingMode: aws_cdk_lib_2.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            stream: aws_cdk_lib_2.aws_dynamodb.StreamViewType.NEW_IMAGE,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY
        });
        todosTable.addLocalSecondaryIndex({
            indexName: "Todos-Year-Index",
            sortKey: {
                name: "year",
                type: aws_cdk_lib_2.aws_dynamodb.AttributeType.NUMBER
            }
        });
        todosTable.addGlobalSecondaryIndex({
            indexName: "Todos-Title-Year-Index",
            partitionKey: {
                name: "year",
                type: aws_cdk_lib_2.aws_dynamodb.AttributeType.NUMBER
            },
            sortKey: {
                name: "title",
                type: aws_cdk_lib_2.aws_dynamodb.AttributeType.STRING
            }
        });
        const TableStreamHandler = new aws_cdk_lib_2.aws_lambda.Function(this, 'StreamHandlerDyanmodb', {
            code: aws_cdk_lib_2.aws_lambda.Code.fromAsset('functions/TableStreamHandler'),
            handler: 'index.handler',
            functionName: 'TableStreamHandler',
            runtime: aws_cdk_lib_2.aws_lambda.Runtime.NODEJS_16_X,
        });
        TableStreamHandler.addEventSource(new aws_lambda_event_sources_1.DynamoEventSource(todosTable, {
            startingPosition: aws_cdk_lib_2.aws_lambda.StartingPosition.LATEST,
        }));
        const todosLambda = new aws_cdk_lib_2.aws_lambda.Function(this, 'AppsyncTodoHandler', {
            runtime: aws_cdk_lib_2.aws_lambda.Runtime.NODEJS_16_X,
            handler: 'main.handler',
            code: aws_cdk_lib_2.aws_lambda.Code.fromAsset('functions'),
            memorySize: 1024
        });
        todosTable.grantFullAccess(todosLambda);
        todosLambda.addEnvironment('TODOS_TABLE', todosTable.tableName);
        todosLambda.addEnvironment('TODOS_TITLE_YEAR_INDEX', "Todos-Title-Year-Index");
        todosLambda.addEnvironment('TODOS_YEAR_INDEX', "Todos-Year-Index");
        // Add lambda as data source
        const lambdaDs = appsyncApi.addLambdaDataSource('lambdaDatasource', todosLambda);
        // Add resolvers
        lambdaDs.createResolver({
            typeName: 'Query',
            fieldName: 'getTodos',
        });
        lambdaDs.createResolver({
            typeName: 'Query',
            fieldName: 'getTodoByUsername',
        });
        lambdaDs.createResolver({
            typeName: 'Query',
            fieldName: 'getTodoByUsernameAndTitle',
        });
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "getTodoByUsernameAndId",
        });
        lambdaDs.createResolver({
            typeName: 'Query',
            fieldName: 'getTodosByUsernameAndYear',
        });
        lambdaDs.createResolver({
            typeName: 'Query',
            fieldName: 'getTodosByYearAndTitle',
        });
        lambdaDs.createResolver({
            typeName: 'Mutation',
            fieldName: 'addTodo',
        });
        lambdaDs.createResolver({
            typeName: 'Mutation',
            fieldName: 'updateTodo',
        });
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "deleteTodo"
        });
    }
}
exports.ApnaAppsyncDynamodbIndexQueriesStack = ApnaAppsyncDynamodbIndexQueriesStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBuYWFwcHN5bmMtZHluYW1vZGItaW5kZXgtcXVlcmllcy1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwbmFhcHBzeW5jLWR5bmFtb2RiLWluZGV4LXF1ZXJpZXMtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQStEO0FBRS9ELHNEQUFzRDtBQUN0RCw2Q0FBNEU7QUFDNUUsbUZBQXlFO0FBQ3pFLE1BQWEsb0NBQXFDLFNBQVEsbUJBQUs7SUFDN0QsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUNyRCxJQUFJLEVBQUUsMEJBQTBCO1lBQ2hDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQztTQUMxRCxDQUFDLENBQUE7UUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLDBCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDeEQsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxVQUFVO2dCQUNoQixJQUFJLEVBQUUsMEJBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTTthQUNwQztZQUNELE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsT0FBTztnQkFDYixJQUFJLEVBQUUsMEJBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTTthQUNwQztZQUNELFdBQVcsRUFBRSwwQkFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlO1lBQ2pELE1BQU0sRUFBRSwwQkFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTO1lBQ3pDLGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87U0FDckMsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLHNCQUFzQixDQUFDO1lBQ2hDLFNB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QUFFLFNBQVM7U0FDckIsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGNBQWMsQ0FBQztZQUN0QixRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsWUFBWTtTQUN4QixDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQ3RCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQWxIRCxvRkFrSEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZW1vdmFsUG9saWN5LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYy1hbHBoYSc7XG5pbXBvcnQgeyBhd3NfZHluYW1vZGIgYXMgZHluYW1vZGIsIGF3c19sYW1iZGEgYXMgbGFtYmRhIH0gZnJvbSAnYXdzLWNkay1saWInXG5pbXBvcnQgeyBEeW5hbW9FdmVudFNvdXJjZSB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEtZXZlbnQtc291cmNlcyc7XG5leHBvcnQgY2xhc3MgQXBuYUFwcHN5bmNEeW5hbW9kYkluZGV4UXVlcmllc1N0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGFwcHN5bmNBcGkgPSBuZXcgYXBwc3luYy5HcmFwaHFsQXBpKHRoaXMsICdhcGknLCB7XG4gICAgICBuYW1lOiAnYXBwc3luYy1keW5vZGItcXVlcnktYXBpJyxcbiAgICAgIHNjaGVtYTogYXBwc3luYy5TY2hlbWEuZnJvbUFzc2V0KCdzY2hlbWEvc2NoZW1hLmdyYXBocWwnKVxuICAgIH0pXG5cbiAgICBjb25zdCB0b2Rvc1RhYmxlID0gbmV3IGR5bmFtb2RiLlRhYmxlKHRoaXMsICdUb2Rvc1RhYmxlJywge1xuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6ICd1c2VybmFtZScsXG4gICAgICAgIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIHNvcnRLZXk6IHtcbiAgICAgICAgbmFtZTogJ3RpdGxlJyxcbiAgICAgICAgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBiaWxsaW5nTW9kZTogZHluYW1vZGIuQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNULFxuICAgICAgc3RyZWFtOiBkeW5hbW9kYi5TdHJlYW1WaWV3VHlwZS5ORVdfSU1BR0UsXG4gICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1lcbiAgICB9KTtcblxuICAgIHRvZG9zVGFibGUuYWRkTG9jYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6IFwiVG9kb3MtWWVhci1JbmRleFwiLFxuICAgICAgc29ydEtleToge1xuICAgICAgICBuYW1lOiBcInllYXJcIixcbiAgICAgICAgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5OVU1CRVJcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdG9kb3NUYWJsZS5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6IFwiVG9kb3MtVGl0bGUtWWVhci1JbmRleFwiLFxuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6IFwieWVhclwiLFxuICAgICAgICB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLk5VTUJFUlxuICAgICAgfSxcbiAgICAgIHNvcnRLZXk6IHtcbiAgICAgICAgbmFtZTogXCJ0aXRsZVwiLFxuICAgICAgICB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBUYWJsZVN0cmVhbUhhbmRsZXIgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdTdHJlYW1IYW5kbGVyRHlhbm1vZGInLCB7XG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2Z1bmN0aW9ucy9UYWJsZVN0cmVhbUhhbmRsZXInKSxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIGZ1bmN0aW9uTmFtZTogJ1RhYmxlU3RyZWFtSGFuZGxlcicsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTZfWCxcbiAgICB9KTtcblxuICAgIFRhYmxlU3RyZWFtSGFuZGxlci5hZGRFdmVudFNvdXJjZShuZXcgRHluYW1vRXZlbnRTb3VyY2UodG9kb3NUYWJsZSwge1xuICAgICAgc3RhcnRpbmdQb3NpdGlvbjogbGFtYmRhLlN0YXJ0aW5nUG9zaXRpb24uTEFURVNULFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHRvZG9zTGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnQXBwc3luY1RvZG9IYW5kbGVyJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICBoYW5kbGVyOiAnbWFpbi5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnZnVuY3Rpb25zJyksXG4gICAgICBtZW1vcnlTaXplOiAxMDI0XG4gICAgfSk7XG5cbiAgICB0b2Rvc1RhYmxlLmdyYW50RnVsbEFjY2Vzcyh0b2Rvc0xhbWJkYSk7XG4gICAgdG9kb3NMYW1iZGEuYWRkRW52aXJvbm1lbnQoJ1RPRE9TX1RBQkxFJywgdG9kb3NUYWJsZS50YWJsZU5hbWUpO1xuICAgIHRvZG9zTGFtYmRhLmFkZEVudmlyb25tZW50KCdUT0RPU19USVRMRV9ZRUFSX0lOREVYJywgXCJUb2Rvcy1UaXRsZS1ZZWFyLUluZGV4XCIpO1xuICAgIHRvZG9zTGFtYmRhLmFkZEVudmlyb25tZW50KCdUT0RPU19ZRUFSX0lOREVYJywgXCJUb2Rvcy1ZZWFyLUluZGV4XCIpO1xuXG4gICAgLy8gQWRkIGxhbWJkYSBhcyBkYXRhIHNvdXJjZVxuICAgIGNvbnN0IGxhbWJkYURzID0gYXBwc3luY0FwaS5hZGRMYW1iZGFEYXRhU291cmNlKCdsYW1iZGFEYXRhc291cmNlJywgdG9kb3NMYW1iZGEpO1xuXG4gICAgLy8gQWRkIHJlc29sdmVyc1xuICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiAnUXVlcnknLFxuICAgICAgZmllbGROYW1lOiAnZ2V0VG9kb3MnLFxuICAgIH0pO1xuXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6ICdRdWVyeScsXG4gICAgICBmaWVsZE5hbWU6ICdnZXRUb2RvQnlVc2VybmFtZScsXG4gICAgfSk7XG5cbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogJ1F1ZXJ5JyxcbiAgICAgIGZpZWxkTmFtZTogJ2dldFRvZG9CeVVzZXJuYW1lQW5kVGl0bGUnLFxuICAgIH0pO1xuXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiUXVlcnlcIixcbiAgICAgIGZpZWxkTmFtZTogXCJnZXRUb2RvQnlVc2VybmFtZUFuZElkXCIsXG4gICAgfSlcblxuICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiAnUXVlcnknLFxuICAgICAgZmllbGROYW1lOiAnZ2V0VG9kb3NCeVVzZXJuYW1lQW5kWWVhcicsXG4gICAgfSk7XG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6ICdRdWVyeScsXG4gICAgICBmaWVsZE5hbWU6ICdnZXRUb2Rvc0J5WWVhckFuZFRpdGxlJyxcbiAgICB9KTtcblxuICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiAnTXV0YXRpb24nLFxuICAgICAgZmllbGROYW1lOiAnYWRkVG9kbycsXG4gICAgfSk7XG5cbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogJ011dGF0aW9uJyxcbiAgICAgIGZpZWxkTmFtZTogJ3VwZGF0ZVRvZG8nLFxuICAgIH0pO1xuXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJkZWxldGVUb2RvXCJcbiAgICB9KVxuICB9XG59XG4iXX0=