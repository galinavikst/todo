export type Status = "to do" | "in progress" | "done";

export interface ITask {
  id: number;
  description: string;
  title: string;
  status: string;
  boardId: string;
  orderIndex: number;
}

export interface IBoardSections {
  [taskStatus_boardId: string]: ITask[];
}

export interface IBoard {
  id: string;
}
