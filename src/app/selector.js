import { createSelector } from "@reduxjs/toolkit";
import {
  filterPrioritiesSelector,
  filterStatusSelector,
  searchTextSelector
} from "../components/Filters/filtersSlice";
import { todoListSelector } from "../components/TodoList/todosSlice";

export const todosRemainingSelector = createSelector(
  todoListSelector,
  filterStatusSelector,
  searchTextSelector,
  filterPrioritiesSelector,
  (todoList, status, searchText, priority) => {
    return todoList.filter((todo) => {
      if (status === "All")
        return priority.length
          ? todo.name.includes(searchText) && priority.includes(todo.priority)
          : todo.name.includes(searchText);
      return (
        todo.name.includes(searchText) &&
        (status === "Completed" ? todo.completed : !todo.completed) &&
        (priority.length ? priority.includes(todo.priority) : true)
      );
    });
  }
);
