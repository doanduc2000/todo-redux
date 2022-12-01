import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "../components/Filters/filtersSlice";
import todoSlice from "../components/TodoList/todosSlice";

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todoSlice.reducer
  }
});
export default store;
