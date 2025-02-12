import React, { Fragment, useState } from "react";
import Task from "./Task";
import { ITask, Status } from "@/types";
import { IoAddOutline } from "react-icons/io5";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Modal from "./Modal";
import TaskForm from "./TaskForm";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useLazyGetTasksByBoardIdQuery,
  useUpdateTaskMutation,
} from "@/redux/slices/apiSlice";
import { setTasks } from "@/redux/slices/boardSlice";
import toast from "react-hot-toast";

type BoardSectionProps = {
  id: Status;
  tasks: ITask[];
  title: string;
};

const BoardSection = ({ tasks, title, id }: BoardSectionProps) => {
  const dispatch = useAppDispatch();
  const { setNodeRef } = useDroppable({
    id,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const { boardId, tasks: stateTasks } = useAppSelector((state) => state.board);

  const [addTask] = useAddTaskMutation();
  const [delelteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [getBoardTasks] = useLazyGetTasksByBoardIdQuery();

  const handleDeleteTask = async (taskId: number) => {
    try {
      await delelteTask(taskId).unwrap();
      const updatedTask = stateTasks.filter((el: ITask) => el.id !== taskId);
      dispatch(setTasks(updatedTask));
      toast.success("Deleted!");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleModalOpen = (task?: ITask) => {
    setIsModalOpen(true);
    if (task) setSelectedTask(task);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleModalSave = async (data: Partial<ITask>) => {
    try {
      if (selectedTask) {
        const res = await updateTask({ id: selectedTask.id, ...data }).unwrap();
        const updated = stateTasks.map((el) =>
          el.id === selectedTask.id ? res : el
        );

        dispatch(setTasks(updated));
        toast.success("Updated!");
      } else {
        const boardTasks = await getBoardTasks(boardId).unwrap();
        const res = await addTask({
          ...data,
          boardId,
          status: "to do",
          orderIndex: boardTasks.length + 1,
        }).unwrap();

        dispatch(setTasks([...stateTasks, res]));
        toast.success("Created!");
      }
      handleModalClose();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="p-3 bg-slate-200 rounded grow w-1/4 min-w-[200px] h-fit">
      <p className="capitalize font-bold">{title}</p>
      {tasks && (
        <SortableContext
          id={id}
          items={tasks}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef}>
            {tasks.map((el) => (
              <Fragment key={el.id}>
                <Task
                  task={el}
                  handleModalOpen={handleModalOpen}
                  deleteTask={handleDeleteTask}
                />
              </Fragment>
            ))}
          </div>
        </SortableContext>
      )}

      {title === "to do" && (
        <button
          onClick={() => handleModalOpen()}
          className="bg-white w-full rounded-sm p-3 flex justify-center shadow-sm"
        >
          <IoAddOutline className="w-8 h-8" title="add task icon" />
        </button>
      )}

      {isModalOpen && (
        <Modal
          form="taskForm"
          handleModalClose={handleModalClose}
          children={
            <TaskForm onsubmit={handleModalSave} defaultValues={selectedTask} />
          }
        />
      )}
    </div>
  );
};

export default BoardSection;
