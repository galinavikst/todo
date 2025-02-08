import { INVALID_INPUT } from "@/constants";
import { ITask } from "@/types";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TaskFormProps {
  onsubmit: (data: ITask) => void;
  defaultValues: ITask | null;
  boardId: string;
}

const TaskForm = ({ onsubmit, defaultValues, boardId }: TaskFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues || { title: "", description: "" },
  });

  const inputs = ["title", "description"] as const;

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      id="taskForm"
      className="flex flex-col gap-2 my-5"
    >
      <p className="font-bold uppercase m-auto">{boardId}</p>
      {inputs.map((el) => (
        <Controller
          key={el}
          name={el}
          control={control}
          rules={{
            validate: (value) => value.trim().length > 2,
          }}
          render={({ field }) => (
            <label>
              {el}
              <input {...field} />
              {errors[el] && <p className="error">{INVALID_INPUT}</p>}
            </label>
          )}
        />
      ))}
    </form>
  );
};

export default TaskForm;
