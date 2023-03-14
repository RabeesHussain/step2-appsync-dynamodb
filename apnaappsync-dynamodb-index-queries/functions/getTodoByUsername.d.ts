import { DocumentClient } from 'aws-sdk/clients/dynamodb';
export declare const getTodoByUsername: (username: string) => Promise<DocumentClient.ItemList | null | undefined>;
