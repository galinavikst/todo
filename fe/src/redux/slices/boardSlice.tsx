import { IBoard, ITask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type BoardState = {
  boardId: string;
  tasks: ITask[];
  boards: IBoard[];
};

const boardSlice = createSlice({
  name: "board",
  initialState: {} as BoardState,
  reducers: {
    setBoardId(state, action) {
      state.boardId = action.payload;
    },
    setBoards(state, action) {
      state.boards = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const { setBoardId, setBoards, setTasks } = boardSlice.actions;

export default boardSlice.reducer;
