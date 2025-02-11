"use client";
import {
  useGetBoardsQuery,
  useLazyGetBoardByIdQuery,
  useLazyGetBoardsQuery,
  useLazyGetTasksByBoardIdQuery,
} from "@/redux/slices/apiSlice";
import { setBoardId, setBoards, setTasks } from "@/redux/slices/boardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";

const BoardLoader = () => {
  const dispatch = useAppDispatch();

  // const { data: allBoards, isLoading: allBoardsidLoading } =
  //   useGetBoardsQuery();
  const [getAllBoards] = useLazyGetBoardsQuery();
  const [getTasksByBoardId, { data: board, error, isLoading }] =
    useLazyGetTasksByBoardIdQuery();

  const [searchValue, setSearchValue] = useState<string>("");
  const { boards } = useAppSelector((state) => state.board);
  console.log("BoardLoader", boards);

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await getAllBoards();
        if (res.data) dispatch(setBoards(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    getBoards();

    // if (allBoards) dispatch(setBoards(allBoards));
  }, []);

  const handleLoad = async () => {
    if (!searchValue.trim()) return;

    console.log("handle load boards", boards);

    const selectedBoard = boards.find((el) => el.id === searchValue);
    if (selectedBoard) {
      dispatch(setBoardId(selectedBoard.id));

      // get tasks fot board here
      const res = await getTasksByBoardId(selectedBoard.id);
      console.log(res);
      if (res.data) dispatch(setTasks(res.data));
    } else {
      //hot toast here
      console.log("board not found");
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
