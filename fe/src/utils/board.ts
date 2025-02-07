import { IBoardSections, Status, ITask } from "@/types";
import { BOARD_SECTIONS } from "@/constants";
import { getTasksByStatus } from "@/utils/task";

export const initializeBoard = (tasks: ITask[]) => {
  const boardSections: IBoardSections = {};

  Object.keys(BOARD_SECTIONS).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTasksByStatus(
      tasks,
      boardSectionKey as Status
    );
  });

  return boardSections;
};

export const findBoardSectionContainer = (
  boardSections: IBoardSections,
  id: string
) => {
  if (id in boardSections) return id;

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );

  return container;
};
