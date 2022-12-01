import { createServer, Model } from "miragejs";

export const setupServer = () => {
  createServer({
    models: {
      todos: Model
    },
    routes() {
      this.get("/api/todos/", (schema) => {
        return schema.todos.all();
      });
      this.post("/api/filterTodos/", (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        const todoList = schema.todos.all();
        return todoList.filter((todo) => {
          if (payload.status === "All")
            return payload.priority.length
              ? todo.name.includes(payload.searchText) &&
                  payload.priority.includes(todo.priority)
              : todo.name.includes(payload.searchText);
          return (
            todo.name.includes(payload.searchText) &&
            (payload.status === "Completed"
              ? todo.completed
              : !todo.completed) &&
            (payload.priority.length
              ? payload.priority.includes(todo.priority)
              : true)
          );
        });
      });
      this.post("/api/todos", (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        return schema.todos.create(payload);
      });
      this.post("/api/updateTodo", (schema, request) => {
        const id = JSON.parse(request.requestBody);
        const currentTodo = schema.todos.find(id);
        currentTodo.update({ completed: !currentTodo.completed });
        return currentTodo;
      });
    }
  });
};
