export type Status = "to do" | "in progress" | "done";

export interface ITask {
  id: string;
  description: string;
  title: string;
  status: string;
  boardId: string;
}

export interface IBoardSections {
  [taskStatus_boardId: string]: ITask[];
}
