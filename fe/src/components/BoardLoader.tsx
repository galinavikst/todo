"use client";
import {
  useLazyGetBoardByIdQuery,
  useLazyGetBoardsQuery,
  useLazyGetTasksByBoardIdQuery,
} from "@/redux/slices/apiSlice";
import { setBoardId, setBoards, setTasks } from "@/redux/slices/boardSlice";
import { useAppDispatch } from "@/redux/store";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BoardLoader = () => {
  const dispatch = useAppDispatch();
  const [getAllBoards] = useLazyGetBoardsQuery();
  const [getTasksByBoardId] = useLazyGetTasksByBoardIdQuery();
  const [getBoardById] = useLazyGetBoardByIdQuery();

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await getAllBoards().unwrap();
        if (res) dispatch(setBoards(res));
      } catch (error) {
        toast.error(error.data.message);
      }
    };
    getBoards();
  }, []);

  const handleLoad = async () => {
    if (!searchValue.trim()) return;

    try {
      const selectedBoard = await getBoardById(searchValue).unwrap();
      dispatch(setBoardId(selectedBoard.id));
      const res = await getTasksByBoardId(selectedBoard.id).unwrap();
      dispatch(setTasks(res));
      toast.success("Loaded!");
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
