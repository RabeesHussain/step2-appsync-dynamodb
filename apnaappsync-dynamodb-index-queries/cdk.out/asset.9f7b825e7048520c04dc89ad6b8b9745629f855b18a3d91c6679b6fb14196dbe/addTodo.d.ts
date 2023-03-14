import { Todo } from './types';
declare function addTodo(todo: Todo): Promise<Todo | null>;
export default addTodo;
