import { ITask } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";

type TaskProps = {
  task: ITask;
  handleModalOpen: (task: ITask) => void;
  deleteTask: (taskId: string) => void;
};

const Task = ({ task, handleModalOpen, deleteTask }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="p-3 my-2 border rounded flex flex-col gap-3 bg-white shadow-sm"
      >
        <div>
          <p className="font-bold text-xl">{task.title}</p>
          <p>{task.description}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => handleModalOpen(task)}
            className="hover:scale-105"
          >
            <LiaEditSolid className="w-5 h-5" title="edit icon" />
          </button>
          <button
            className="hover:scale-105"
            onClick={() => deleteTask(task.id)}
          >
            <RiDeleteBin5Line className="w-5 h-5" title="delete icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
