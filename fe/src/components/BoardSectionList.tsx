"use client";
import { IBoardSections, Status } from "@/types";
import { findBoardSectionContainer, initializeBoard } from "@/utils/board";
import React, { Fragment, useEffect, useState } from "react";
import BoardSection from "./BoardSection";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  useLazyGetTasksByBoardIdQuery,
  useUpdateTaskMutation,
} from "@/redux/slices/apiSlice";
import toast from "react-hot-toast";
import { setTasks } from "@/redux/slices/boardSlice";

const BoardSectionList = () => {
  const [updateTask] = useUpdateTaskMutation();
  const dispatch = useAppDispatch();

  const { boardId, tasks } = useAppSelector((state) => state.board);
  const [boardSections, setBoardSections] = useState<IBoardSections>({});

  const [getTasksByBoardId, { isLoading: isTaskLoading }] =
    useLazyGetTasksByBoardIdQuery();

  useEffect(() => {
    const getTasksByBoard = async () => {
      try {
        const res = await getTasksByBoardId(boardId).unwrap();
        setBoardSections(initializeBoard(res));
        dispatch(setTasks(res));
      } catch (error) {
        toast.error(error.data.message);
      }
    };

    if (boardId) getTasksByBoard();
  }, [boardId, tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // handle click on draggable content (task)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    // change task (order and status) with id active => task.status = any of container value
    const newTasksOrder = arrayMove(
      boardSections[overContainer],
      activeIndex,
      overIndex
    );

    try {
      await Promise.all(
        newTasksOrder.map((task, i) =>
          updateTask({
            id: task.id,
            orderIndex: i + 1,
            status: task.id === active.id ? activeContainer : task.status,
          }).unwrap()
        )
      );

      if (activeIndex !== overIndex) {
        setBoardSections((boardSection) => ({
          ...boardSection,
          [overContainer]: newTasksOrder,
        }));
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      {boardId && <p className="font-bold uppercase text-center">{boardId}</p>}
      <div className="flex gap-3 flex-wrap">
        {isTaskLoading ? (
          <p>Loading...</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {Object.keys(boardSections).map((status) => (
              <Fragment key={status}>
                <BoardSection
                  tasks={boardSections[status]}
                  title={status}
                  id={status as Status}
                />
              </Fragment>
            ))}
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default BoardSectionList;
