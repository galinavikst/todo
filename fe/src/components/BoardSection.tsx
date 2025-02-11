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
import { useAppSelector } from "@/redux/store";

type BoardSectionProps = {
  id: Status;
  tasks: ITask[];
  title: string;
};

const BoardSection = ({ tasks, title, id }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  console.log(tasks);

  const deleteTask = (taskId: string) => {
    console.log(taskId, "remove here");
  };

  const handleModalOpen = (task?: ITask) => {
    setIsModalOpen(true);
    if (task) setSelectedTask(task);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleModalSave = (data: ITask) => {
    console.log("submit", data);
    handleModalClose();
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
