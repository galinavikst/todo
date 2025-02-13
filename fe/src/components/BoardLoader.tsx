"use client";
import { useLazyGetBoardByIdQuery } from "@/redux/slices/apiSlice";
import { setBoardId } from "@/redux/slices/boardSlice";
import { useAppDispatch } from "@/redux/store";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BoardLoader = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>("");

  const [getBoardById] = useLazyGetBoardByIdQuery();

  const handleLoad = async () => {
    if (!searchValue.trim()) return;

    try {
      const selectedBoard = await getBoardById(searchValue).unwrap();
      dispatch(setBoardId(selectedBoard.id));
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex w-full max-w-[1000px] gap-5 justify-between m-auto">
      <input
        type="text"
        className="grow-[2]"
        placeholder="Enter a board ID here..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleLoad} className="btn grow">
        Load
      </button>
    </div>
  );
};

export default BoardLoader;
