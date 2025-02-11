import { IBoardSections, ITask } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const INITIAL_TASKS: ITask[] = [
  {
    id: uuidv4(),
    title: "Title 2",
    description: "Desc 2",
    status: "to do",
    boardId: "testid2",
  },
  {
    id: uuidv4(),
    title: "Title 1",
    description: "Desc 1",
    status: "in progres",
    boardId: "testid1",
  },
  {
    id: uuidv4(),
    title: "Title 3",
    description: "Desc 3",
    status: "to do",
    boardId: "testid",
  },
  {
    id: uuidv4(),
    title: "Title 4",
    description: "Desc 4",
    status: "done",
    boardId: "testid",
  },
];

// export const BOARDS: IBoardSections = {
//   testid: INITIAL_TASKS.filter((task) => task.boardId === "testid"),
//   testid1: INITIAL_TASKS.filter((task) => task.boardId === "testid1"),
//   testid2: INITIAL_TASKS.filter((task) => task.boardId === "testid2"),
// };
