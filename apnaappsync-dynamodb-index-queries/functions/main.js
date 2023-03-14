"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTodo_1 = require("./addTodo");
const deleteTodo_1 = require("./deleteTodo");
const getTodos_1 = require("./getTodos");
const updateTodo_1 = require("./updateTodo");
const getTodoByUsername_1 = require("./getTodoByUsername");
const getTodoByUsernameAndTitle_1 = require("./getTodoByUsernameAndTitle");
const getTodoByUsernameAndId_1 = require("./getTodoByUsernameAndId");
const getTodosByUsernameAndYear_1 = require("./getTodosByUsernameAndYear");
const getTodosByYearAndTitle_1 = require("./getTodosByYearAndTitle");
exports.handler = async (event) => {
    switch (event.info.fieldName) {
        case "addTodo":
            return await (0, addTodo_1.default)(event.arguments.todo);
        case "getTodos":
            return await (0, getTodos_1.default)();
        case "getTodoByUsername":
            return await (0, getTodoByUsername_1.getTodoByUsername)(event.arguments.username);
        case "getTodoByUsernameAndTitle":
            return await (0, getTodoByUsernameAndTitle_1.getTodoByUsernameAndTitle)(event.arguments.input);
        case "getTodoByUsernameAndId":
            return await (0, getTodoByUsernameAndId_1.getTodoByUsernameAndId)(event.arguments.input);
        case "getTodosByUsernameAndYear":
            return await (0, getTodosByUsernameAndYear_1.getTodosByUsernameAndYear)(event.arguments.input);
        case "getTodosByYearAndTitle":
            return await (0, getTodosByYearAndTitle_1.getTodosByYearAndTitle)(event.arguments.input);
        case "deleteTodo":
            return await (0, deleteTodo_1.default)(event.arguments.input);
        case "updateTodo":
            return await (0, updateTodo_1.default)(event.arguments.todo);
        default:
            return null;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBZ0M7QUFDaEMsNkNBQXNDO0FBQ3RDLHlDQUFrQztBQUNsQyw2Q0FBc0M7QUFFdEMsMkRBQXdEO0FBQ3hELDJFQUF3RTtBQUN4RSxxRUFBa0U7QUFDbEUsMkVBQXdFO0FBQ3hFLHFFQUFrRTtBQWFsRSxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFtQixFQUFFLEVBQUU7SUFDNUMsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUMxQixLQUFLLFNBQVM7WUFDVixPQUFPLE1BQU0sSUFBQSxpQkFBTyxFQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsS0FBSyxVQUFVO1lBQ1gsT0FBTyxNQUFNLElBQUEsa0JBQVEsR0FBRSxDQUFDO1FBQzVCLEtBQUssbUJBQW1CO1lBQ3BCLE9BQU8sTUFBTSxJQUFBLHFDQUFpQixFQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsS0FBSywyQkFBMkI7WUFDNUIsT0FBTyxNQUFNLElBQUEscURBQXlCLEVBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRSxLQUFLLHdCQUF3QjtZQUN6QixPQUFPLE1BQU0sSUFBQSwrQ0FBc0IsRUFBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9ELEtBQUssMkJBQTJCO1lBQzVCLE9BQU8sTUFBTSxJQUFBLHFEQUF5QixFQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEUsS0FBSyx3QkFBd0I7WUFDekIsT0FBTyxNQUFNLElBQUEsK0NBQXNCLEVBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxLQUFLLFlBQVk7WUFDYixPQUFPLE1BQU0sSUFBQSxvQkFBVSxFQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsS0FBSyxZQUFZO1lBQ2IsT0FBTyxNQUFNLElBQUEsb0JBQVUsRUFBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xEO1lBQ0ksT0FBTyxJQUFJLENBQUM7S0FDbkI7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWRkVG9kbyBmcm9tICcuL2FkZFRvZG8nO1xuaW1wb3J0IGRlbGV0ZVRvZG8gZnJvbSAnLi9kZWxldGVUb2RvJztcbmltcG9ydCBnZXRUb2RvcyBmcm9tICcuL2dldFRvZG9zJztcbmltcG9ydCB1cGRhdGVUb2RvIGZyb20gJy4vdXBkYXRlVG9kbyc7XG5pbXBvcnQgeyBUb2RvIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRUb2RvQnlVc2VybmFtZSB9IGZyb20gJy4vZ2V0VG9kb0J5VXNlcm5hbWUnO1xuaW1wb3J0IHsgZ2V0VG9kb0J5VXNlcm5hbWVBbmRUaXRsZSB9IGZyb20gJy4vZ2V0VG9kb0J5VXNlcm5hbWVBbmRUaXRsZSc7XG5pbXBvcnQgeyBnZXRUb2RvQnlVc2VybmFtZUFuZElkIH0gZnJvbSAnLi9nZXRUb2RvQnlVc2VybmFtZUFuZElkJztcbmltcG9ydCB7IGdldFRvZG9zQnlVc2VybmFtZUFuZFllYXIgfSBmcm9tICcuL2dldFRvZG9zQnlVc2VybmFtZUFuZFllYXInO1xuaW1wb3J0IHsgZ2V0VG9kb3NCeVllYXJBbmRUaXRsZSB9IGZyb20gJy4vZ2V0VG9kb3NCeVllYXJBbmRUaXRsZSc7XG5cbnR5cGUgQXBwU3luY0V2ZW50ID0ge1xuICAgIGluZm86IHtcbiAgICAgICAgZmllbGROYW1lOiBzdHJpbmdcbiAgICB9LFxuICAgIGFyZ3VtZW50czoge1xuICAgICAgICB0b2RvOiBUb2RvLFxuICAgICAgICB1c2VybmFtZTogc3RyaW5nLFxuICAgICAgICBpbnB1dDogYW55XG4gICAgfVxufVxuXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFwcFN5bmNFdmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXZlbnQuaW5mby5maWVsZE5hbWUpIHtcbiAgICAgICAgY2FzZSBcImFkZFRvZG9cIjpcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBhZGRUb2RvKGV2ZW50LmFyZ3VtZW50cy50b2RvKTtcbiAgICAgICAgY2FzZSBcImdldFRvZG9zXCI6XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0VG9kb3MoKTtcbiAgICAgICAgY2FzZSBcImdldFRvZG9CeVVzZXJuYW1lXCI6XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0VG9kb0J5VXNlcm5hbWUoZXZlbnQuYXJndW1lbnRzLnVzZXJuYW1lKTtcbiAgICAgICAgY2FzZSBcImdldFRvZG9CeVVzZXJuYW1lQW5kVGl0bGVcIjpcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBnZXRUb2RvQnlVc2VybmFtZUFuZFRpdGxlKGV2ZW50LmFyZ3VtZW50cy5pbnB1dCk7XG4gICAgICAgIGNhc2UgXCJnZXRUb2RvQnlVc2VybmFtZUFuZElkXCI6XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0VG9kb0J5VXNlcm5hbWVBbmRJZChldmVudC5hcmd1bWVudHMuaW5wdXQpO1xuICAgICAgICBjYXNlIFwiZ2V0VG9kb3NCeVVzZXJuYW1lQW5kWWVhclwiOlxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGdldFRvZG9zQnlVc2VybmFtZUFuZFllYXIoZXZlbnQuYXJndW1lbnRzLmlucHV0KTtcbiAgICAgICAgY2FzZSBcImdldFRvZG9zQnlZZWFyQW5kVGl0bGVcIjpcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBnZXRUb2Rvc0J5WWVhckFuZFRpdGxlKGV2ZW50LmFyZ3VtZW50cy5pbnB1dCk7XG4gICAgICAgIGNhc2UgXCJkZWxldGVUb2RvXCI6XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZGVsZXRlVG9kbyhldmVudC5hcmd1bWVudHMuaW5wdXQpO1xuICAgICAgICBjYXNlIFwidXBkYXRlVG9kb1wiOlxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHVwZGF0ZVRvZG8oZXZlbnQuYXJndW1lbnRzLnRvZG8pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufSJdfQ==