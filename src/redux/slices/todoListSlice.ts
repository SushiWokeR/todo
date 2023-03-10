import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum TodoItemStatusEnum {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  DEFAULT = 'Choose One...',
}

export type TodoItemProps = {
  id: number;
  todoItemText: string;
  completed: boolean;
  priorityStatus: TodoItemStatusEnum;
};

export interface TodoListState {
  allTodoItems: TodoItemProps[];
}

const initialState: TodoListState = {
  allTodoItems: [],
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodoItem: (state, action) => {
      // TODO: не смог типизировать экшн
      state.allTodoItems.push({
        id: action.payload.id,
        todoItemText: action.payload.todoItemText,
        completed: false,
        priorityStatus: TodoItemStatusEnum.DEFAULT,
      });
    },
    setItemDone: (state, action) => {
      const findItem = state.allTodoItems.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.completed = !findItem.completed;
      }
    },
  },
});

export const { addTodoItem, setItemDone } = todoListSlice.actions;

export const selectTodo = (state: RootState) => state.todoList;

export default todoListSlice.reducer;
