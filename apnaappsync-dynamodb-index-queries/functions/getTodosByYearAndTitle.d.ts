import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TodosByYearAndTitleInput } from "./types";
export declare const getTodosByYearAndTitle: (input: TodosByYearAndTitleInput) => Promise<DocumentClient.ItemList | null | undefined>;
