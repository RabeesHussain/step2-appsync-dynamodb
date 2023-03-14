import { deleteTodoInput } from "./types";
declare function deleteTodo(input: deleteTodoInput): Promise<"deleted" | null>;
export default deleteTodo;
