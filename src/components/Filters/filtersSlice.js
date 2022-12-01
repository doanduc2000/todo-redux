import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    status: "All",
    priority: []
  },
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
    statusFilterChange: (state, action) => {
      state.status = action.payload;
    },
    priorityFilterChange: (state, action) => {
      state.priority = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(filterTodos.fulfilled, (state, action) => {
      state.search = action.payload;
      state.status = action.payload;
      state.priority = action.payload;
    });
  }
});

export const filterTodos = createAsyncThunk(
  "todos/filterTodos",
  async (filterTodo) => {
    const res = await fetch("api/filterTodos", {
      method: "POST",
      body: JSON.stringify(filterTodo)
    });
    const data = await res.json();
    return data.todos;
  }
);
export default filtersSlice;
export const searchTextSelector = (state) => state.filters.search;
export const filterStatusSelector = (state) => state.filters.status;
export const filterPrioritiesSelector = (state) => state.filters.priority;
