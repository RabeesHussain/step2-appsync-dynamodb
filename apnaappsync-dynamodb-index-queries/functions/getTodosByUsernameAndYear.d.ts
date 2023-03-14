import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TodosByUsernameAndYearInput } from "./types";
export declare const getTodosByUsernameAndYear: (input: TodosByUsernameAndYearInput) => Promise<DocumentClient.ItemList | null | undefined>;
