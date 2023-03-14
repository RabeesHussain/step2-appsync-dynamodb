import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TodoByUsernameAndIdInput } from "./types";
export declare const getTodoByUsernameAndId: (input: TodoByUsernameAndIdInput) => Promise<DocumentClient.ItemList | null | undefined>;
