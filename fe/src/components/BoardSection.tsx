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
  useGetBoardsQuery,
  useUpdateTaskMutation,
} from "@/redux/slices/apiSlice";
import { setBoards, setTasks } from "@/redux/slices/boardSlice";

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

  const [addTask, {}] = useAddTaskMutation();
  const [delelteTaskMutation, {}] = useDeleteTaskMutation();
  const [updateTaskMutaion] = useUpdateTaskMutation();

  const deleteTask = async (taskId: number) => {
    console.log(taskId, "remove here");
    try {
      await delelteTaskMutation(taskId);
      const updatedTask = stateTasks.filter((el: ITask) => el.id !== taskId);
      dispatch(setTasks(updatedTask));
      // hot toast here deleted id in res
    } catch (error) {
      console.log(error, "deleteTask");
      // hot toast here not deleted id
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
        const res = await updateTaskMutaion({ id: selectedTask.id, ...data });
        console.log(res, "update task");
        const updated = stateTasks.map((el) =>
          el.id === selectedTask.id ? res.data : el
        );
        dispatch(setTasks(updated));
        /// hot toast here task updated
      } else {
        const res = await addTask({
          ...data,
          boardId,
          status: "to do",
        });
        dispatch(setTasks([...stateTasks, res.data]));
        /// hot toast here task created
      }
      handleModalClose();
    } catch (error) {
      console.log(error, "create task");
      /// hot toast here task not created
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
                  deleteTask={deleteTask}
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
            <TaskForm
              boardId="testid"
              onsubmit={handleModalSave}
              defaultValues={selectedTask}
            />
          }
        />
      )}
    </div>
  );
};

export default BoardSection;
