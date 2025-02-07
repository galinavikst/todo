import { ITask } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const INITIAL_TASKS: ITask[] = [
  {
    id: uuidv4(),
    title: "Title 2",
    description: "Desc 2",
    status: "to do",
  },
  {
    id: uuidv4(),
    title: "Title 1",
    description: "Desc 1",
    status: "in progres",
  },
  {
    id: uuidv4(),
    title: "Title 3",
    description: "Desc 3",
    status: "to do",
  },
  {
    id: uuidv4(),
    title: "Title 4",
    description: "Desc 4",
    status: "done",
  },
];
