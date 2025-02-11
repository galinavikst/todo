"use client";
import { useLazyGetBoardByIdQuery } from "@/redux/slices/apiSlice";
import { setBoard } from "@/redux/slices/boardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";

const BoardLoader = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.board);

  const [searchValue, setSearchValue] = useState<string>("");

  // const [trigger, { data: board, error, isLoading }] =
  //   useLazyGetBoardByIdQuery();

  const handleLoad = async () => {
    if (!searchValue.trim()) return;

    const selectedBoard = boards.find((el) => el.id === searchValue);
    if (selectedBoard) {
      dispatch(setBoard(selectedBoard.id));
    }

    // try {
    //   const res = await trigger(searchValue, true);
    //   dispatch(setBoard(res.data?.id)); // If you want to store it in Redux
    // } catch (err) {
    //   console.error("Error fetching board:", err);
    // }
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
