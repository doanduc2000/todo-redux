import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    status: "idle",
    todos: []
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = "idle";
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        let currentTodo = state.todos.find(
          (todo) => todo.id === action.payload
        );
        currentTodo = action.payload;
      });
  }
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("api/todos");
  const data = await res.json();
  return data;
});

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (newTodo) => {
    const res = await fetch("api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo)
    });
    const data = await res.json();
    return data.todos;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo) => {
    const res = await fetch("/api/updateTodo", {
      method: "POST",
      body: JSON.stringify(updatedTodo)
    });
    const data = await res.json();
    return data.todos;
  }
);

export default todoSlice;
export const todoListSelector = (state) => {
  console.log(state.todoList.todos);
  return state.todoList.todos;
};
