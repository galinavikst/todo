import { ReactNode } from "react";

export type Status = "to do" | "in progress" | "done";

export interface ITask {
  id: string;
  description: string;
  title: string;
  status: string;
}

export interface IBoardSections {
  [taskStatus: string]: ITask[];
}
