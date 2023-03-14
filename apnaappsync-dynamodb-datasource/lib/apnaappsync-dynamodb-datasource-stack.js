"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApnaAppsyncDynamodbDatasourceStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const aws_cdk_lib_2 = require("aws-cdk-lib");
class ApnaAppsyncDynamodbDatasourceStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const appsyncApi = new appsync.GraphqlApi(this, 'api', {
            name: 'apnaappsync-dynodb-datasource-api',
            schema: appsync.Schema.fromAsset('schema/schema.gql')
        });
        const dynamoDBTable = new aws_cdk_lib_2.aws_dynamodb.Table(this, 'NotesTable', {
            partitionKey: {
                name: 'id',
                type: aws_cdk_lib_2.aws_dynamodb.AttributeType.STRING,
            },
            billingMode: aws_cdk_lib_2.aws_dynamodb.BillingMode.PAY_PER_REQUEST
        });
        ///Attaching Datasource to api
        const db_data_source = appsyncApi.addDynamoDbDataSource('DataSources', dynamoDBTable);
        db_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "createNote",
            requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(appsync.PrimaryKey.partition('id').auto(), ///Create an autoID for your primary Key Id
            appsync.Values.projecting() ///Add Remaining input values
            ),
            responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem() ////Mapping template for a single result item from DynamoDB.
        });
        db_data_source.createResolver({
            typeName: "Query",
            fieldName: "notes",
            requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
            responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
        });
        db_data_source.createResolver({
            typeName: "Query",
            fieldName: "notesById",
            requestMappingTemplate: appsync.MappingTemplate.dynamoDbGetItem('id', 'id'),
            responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem() ////Mapping template for a single result item from DynamoDB.
        });
        db_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "deleteNote",
            requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem('id', 'id'),
            responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem() ////Mapping template for a single result item from DynamoDB.
        });
        db_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "updateNote",
            requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(///Mapping template to save a single item to a DynamoDB table.
            appsync.PrimaryKey.partition('id').is('id'), ///Where id is input ID
            appsync.Values.projecting()),
            responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem() ////Mapping template for a single result item from DynamoDB.
        });
    }
}
exports.ApnaAppsyncDynamodbDatasourceStack = ApnaAppsyncDynamodbDatasourceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBuYWFwcHN5bmMtZHluYW1vZGItZGF0YXNvdXJjZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwbmFhcHBzeW5jLWR5bmFtb2RiLWRhdGFzb3VyY2Utc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQWdEO0FBRWhELHNEQUFxRDtBQUNyRCw2Q0FBc0Q7QUFFdEQsTUFBYSxrQ0FBbUMsU0FBUSxtQkFBSztJQUMzRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ3JELElBQUksRUFBRSxtQ0FBbUM7WUFDekMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDO1NBQ3RELENBQUMsQ0FBQTtRQUVGLE1BQU0sYUFBYSxHQUFHLElBQUksMEJBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUMzRCxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLDBCQUFRLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDcEM7WUFDRCxXQUFXLEVBQUUsMEJBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZTtTQUNsRCxDQUFDLENBQUM7UUFFSCw4QkFBOEI7UUFDOUIsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV0RixjQUFjLENBQUMsY0FBYyxDQUFDO1lBQzVCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUM3RCxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBUywyQ0FBMkM7WUFDN0YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBdUIsNkJBQTZCO2FBQ2hGO1lBQ0QsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFHLDREQUE0RDtTQUNySSxDQUFDLENBQUE7UUFFRixjQUFjLENBQUMsY0FBYyxDQUFDO1lBQzVCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUU7WUFDbkUsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRTtTQUN0RSxDQUFDLENBQUE7UUFFRixjQUFjLENBQUMsY0FBYyxDQUFDO1lBQzVCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7WUFDM0UsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFhLDREQUE0RDtTQUMvSSxDQUFDLENBQUM7UUFHSCxjQUFjLENBQUMsY0FBYyxDQUFDO1lBQzVCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztZQUM5RSx1QkFBdUIsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQWEsNERBQTREO1NBQy9JLENBQUMsQ0FBQztRQUVILGNBQWMsQ0FBQyxjQUFjLENBQUM7WUFDNUIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFlBQVk7WUFDdkIsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQWlCLDhEQUE4RDtZQUM1SSxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQW1DLHVCQUF1QjtZQUNyRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzlCLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBSyw0REFBNEQ7U0FDdkksQ0FBQyxDQUFDO0lBRUwsQ0FBQztDQUNGO0FBOURELGdGQThEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcHBzeW5jLWFscGhhJ1xuaW1wb3J0IHsgYXdzX2R5bmFtb2RiIGFzIGR5bmFtb2RiIH0gZnJvbSAnYXdzLWNkay1saWInXG5cbmV4cG9ydCBjbGFzcyBBcG5hQXBwc3luY0R5bmFtb2RiRGF0YXNvdXJjZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGFwcHN5bmNBcGkgPSBuZXcgYXBwc3luYy5HcmFwaHFsQXBpKHRoaXMsICdhcGknLCB7XG4gICAgICBuYW1lOiAnYXBuYWFwcHN5bmMtZHlub2RiLWRhdGFzb3VyY2UtYXBpJyxcbiAgICAgIHNjaGVtYTogYXBwc3luYy5TY2hlbWEuZnJvbUFzc2V0KCdzY2hlbWEvc2NoZW1hLmdxbCcpXG4gICAgfSlcblxuICAgIGNvbnN0IGR5bmFtb0RCVGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywgJ05vdGVzVGFibGUnLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcsXG4gICAgICB9LFxuICAgICAgYmlsbGluZ01vZGU6IGR5bmFtb2RiLkJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVFxuICAgIH0pO1xuXG4gICAgLy8vQXR0YWNoaW5nIERhdGFzb3VyY2UgdG8gYXBpXG4gICAgY29uc3QgZGJfZGF0YV9zb3VyY2UgPSBhcHBzeW5jQXBpLmFkZER5bmFtb0RiRGF0YVNvdXJjZSgnRGF0YVNvdXJjZXMnLCBkeW5hbW9EQlRhYmxlKTtcblxuICAgIGRiX2RhdGFfc291cmNlLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXG4gICAgICBmaWVsZE5hbWU6IFwiY3JlYXRlTm90ZVwiLFxuICAgICAgcmVxdWVzdE1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZHluYW1vRGJQdXRJdGVtKFxuICAgICAgICBhcHBzeW5jLlByaW1hcnlLZXkucGFydGl0aW9uKCdpZCcpLmF1dG8oKSwgICAgICAgIC8vL0NyZWF0ZSBhbiBhdXRvSUQgZm9yIHlvdXIgcHJpbWFyeSBLZXkgSWRcbiAgICAgICAgYXBwc3luYy5WYWx1ZXMucHJvamVjdGluZygpICAgICAgICAgICAgICAgICAgICAgICAvLy9BZGQgUmVtYWluaW5nIGlucHV0IHZhbHVlc1xuICAgICAgKSxcbiAgICAgIHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5keW5hbW9EYlJlc3VsdEl0ZW0oKSAgIC8vLy9NYXBwaW5nIHRlbXBsYXRlIGZvciBhIHNpbmdsZSByZXN1bHQgaXRlbSBmcm9tIER5bmFtb0RCLlxuICAgIH0pXG5cbiAgICBkYl9kYXRhX3NvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxuICAgICAgZmllbGROYW1lOiBcIm5vdGVzXCIsXG4gICAgICByZXF1ZXN0TWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5keW5hbW9EYlNjYW5UYWJsZSgpLCAgICAgIC8vL01hcHBpbmcgdGVtcGxhdGUgdG8gc2NhbiBhIER5bmFtb0RCIHRhYmxlIHRvIGZldGNoIGFsbCBlbnRyaWVzLlxuICAgICAgcmVzcG9uc2VNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmR5bmFtb0RiUmVzdWx0TGlzdCgpLCAgICAvLy8vTWFwcGluZyB0ZW1wbGF0ZSBmb3IgYSByZXN1bHQgbGlzdCBmcm9tIER5bmFtb0RCLlxuICAgIH0pXG5cbiAgICBkYl9kYXRhX3NvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxuICAgICAgZmllbGROYW1lOiBcIm5vdGVzQnlJZFwiLFxuICAgICAgcmVxdWVzdE1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZHluYW1vRGJHZXRJdGVtKCdpZCcsICdpZCcpLCAgICAgICAvLy9HZXQgaXRlbSBmcm9tIHRhYmxlIGFjY29yZGluZyB0byBpZCByZWNpdmUgaW4gaW5wdXQgIC8vV2hlcmUgaWQgaXMgaW5wdXQgSURcbiAgICAgIHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5keW5hbW9EYlJlc3VsdEl0ZW0oKSAgICAgICAgICAgICAvLy8vTWFwcGluZyB0ZW1wbGF0ZSBmb3IgYSBzaW5nbGUgcmVzdWx0IGl0ZW0gZnJvbSBEeW5hbW9EQi5cbiAgICB9KTtcblxuXG4gICAgZGJfZGF0YV9zb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJkZWxldGVOb3RlXCIsXG4gICAgICByZXF1ZXN0TWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5keW5hbW9EYkRlbGV0ZUl0ZW0oJ2lkJywgJ2lkJyksICAgLy8vTWFwcGluZyB0ZW1wbGF0ZSB0byBkZWxldGUgYSBzaW5nbGUgaXRlbSBmcm9tIGEgRHluYW1vREIgdGFibGUuXG4gICAgICByZXNwb25zZU1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZHluYW1vRGJSZXN1bHRJdGVtKCkgICAgICAgICAgICAgLy8vL01hcHBpbmcgdGVtcGxhdGUgZm9yIGEgc2luZ2xlIHJlc3VsdCBpdGVtIGZyb20gRHluYW1vREIuXG4gICAgfSk7XG5cbiAgICBkYl9kYXRhX3NvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogXCJNdXRhdGlvblwiLFxuICAgICAgZmllbGROYW1lOiBcInVwZGF0ZU5vdGVcIixcbiAgICAgIHJlcXVlc3RNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmR5bmFtb0RiUHV0SXRlbSggICAgICAgICAgICAgICAgLy8vTWFwcGluZyB0ZW1wbGF0ZSB0byBzYXZlIGEgc2luZ2xlIGl0ZW0gdG8gYSBEeW5hbW9EQiB0YWJsZS5cbiAgICAgICAgYXBwc3luYy5QcmltYXJ5S2V5LnBhcnRpdGlvbignaWQnKS5pcygnaWQnKSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vV2hlcmUgaWQgaXMgaW5wdXQgSURcbiAgICAgICAgYXBwc3luYy5WYWx1ZXMucHJvamVjdGluZygpKSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vQWRkIFJlbWFpbmluZyBpbnB1dCB2YWx1ZXNcbiAgICAgIHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5keW5hbW9EYlJlc3VsdEl0ZW0oKSAgICAgLy8vL01hcHBpbmcgdGVtcGxhdGUgZm9yIGEgc2luZ2xlIHJlc3VsdCBpdGVtIGZyb20gRHluYW1vREIuXG4gICAgfSk7XG5cbiAgfVxufVxuIl19