import { INVALID_INPUT } from "@/constants";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface BoardFormProps {
  onsubmit: (data: any) => void;
  defaultValues: { boardId: string } | null;
}

const BoardForm = ({ onsubmit, defaultValues }: BoardFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues || { boardId: "" },
  });

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      id="boardForm"
      className="flex flex-col gap-2 my-5"
    >
      <p className="font-bold uppercase m-auto">
        {defaultValues?.boardId || "Add board"}
      </p>
      <Controller
        name="boardId"
        control={control}
        rules={{
          validate: (value) => value.trim().length > 2,
        }}
        render={({ field }) => (
          <label>
            Board ID
            <input {...field} />
            {errors.boardId && <p className="error">{INVALID_INPUT}</p>}
          </label>
        )}
      />
    </form>
  );
};

export default BoardForm;
