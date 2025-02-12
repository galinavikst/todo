import { ITask } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardBtns from "./CardBtns";

type TaskProps = {
  task: ITask;
  handleModalOpen: (task: ITask) => void;
  deleteTask: (taskId: number) => void;
};

const Task = ({ task, handleModalOpen, deleteTask }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
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
      <CardBtns
        deleteEl={() => deleteTask(task.id)}
        handleModalOpen={() => handleModalOpen(task)}
      />
    </div>
  );
};

export default Task;
