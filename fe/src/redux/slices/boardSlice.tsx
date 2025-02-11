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
    setBoard(state, action) {
      state.boardId = action.payload;
    },
    setBoards(state, action) {
      state.boards = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    // removeProductFromCard(state, action) {
    //   state.cardProducts = state.cardProducts.filter(
    //     (el) => el.id !== action.payload.id
    //   );
    // },
    // changeSingleCardProduct(state, action) {
    //   state.cardProducts = state.cardProducts.map((el) =>
    //     el.id === action.payload.id ? action.payload : el
    //   );
    // },
  },
});

export const {
  setBoard,
  setBoards,
  setTasks,
  // changeSingleCardProduct,
  // removeProductFromCard,
} = boardSlice.actions;

export default boardSlice.reducer;
