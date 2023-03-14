import { DocumentClient } from "aws-sdk/clients/dynamodb";
declare function getTodos(): Promise<DocumentClient.ItemList | null | undefined>;
export default getTodos;
