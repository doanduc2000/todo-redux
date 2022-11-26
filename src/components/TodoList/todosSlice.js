import { createSlice } from "@reduxjs/toolkit";

const todoListSlice = createSlice({
  name: "todoList",
  initialState: [
    { id: 1, name: "Learn Yoga", completed: false, priority: "Medium" },
    { id: 2, name: "Learn Redux", completed: true, priority: "High" },
    { id: 3, name: "Learn Java", completed: false, priority: "Low" }
  ],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if (currentTodo) currentTodo.completed = !currentTodo.completed;
    }
  }
});
export default todoListSlice;
export const todoListSelector = (state) => state.todoList;
