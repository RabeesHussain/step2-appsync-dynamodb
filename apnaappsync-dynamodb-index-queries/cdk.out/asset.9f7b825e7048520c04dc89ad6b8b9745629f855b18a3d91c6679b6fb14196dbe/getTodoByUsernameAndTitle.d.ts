import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TodoByUsernameAndTitleInput } from "./types";
export declare const getTodoByUsernameAndTitle: (input: TodoByUsernameAndTitleInput) => Promise<DocumentClient.ItemList | null | undefined>;
