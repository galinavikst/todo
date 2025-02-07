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

  // const handleModalClose = () => {
  //   setModal({ isOpen: false, action: "" });
  // };

  const handleModalOpen = (el: any) => {
    console.log(el);
    setIsModalOpen(true);
  };

  console.log(isModalOpen);

  return (
    <div className="p-3 bg-slate-200 rounded grow w-1/4 min-w-[200px] h-fit">
      <p className="capitalize font-bold">{title}</p>

      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {tasks &&
            tasks.map((el) => (
              <Fragment key={el.id}>
                <Task task={el} handleModalOpen={handleModalOpen} />
              </Fragment>
            ))}
        </div>
      </SortableContext>

      {title === "to do" && (
        <button
          onClick={handleModalOpen}
          className="bg-white w-full rounded-sm p-3 flex justify-center shadow-sm"
        >
          <IoAddOutline className="w-8 h-8" title="add task icon" />
        </button>
      )}
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          children={undefined}
          onSave={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </div>
  );
};

export default BoardSection;
