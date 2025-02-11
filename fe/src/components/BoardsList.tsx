"use client";
import { IBoardSections } from "@/types";
import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import Modal from "./Modal";
import BoardForm from "./BoardForm";
import {
  useAddBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsQuery,
  useUpdateBoardMutation,
} from "@/redux/slices/apiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setBoardId, setBoards, setTasks } from "@/redux/slices/boardSlice";
import { SerializedError } from "@reduxjs/toolkit";

const BoardsList = () => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const { boards, tasks, boardId } = useAppSelector((state) => state.board);

  const [addBoard, { error: addError, isLoading: addLoading }] =
    useAddBoardMutation();
  const [delBoard, { error: deleteError, isLoading: deleteLoading }] =
    useDeleteBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const handleModalOpen = (board?: string | null) => {
    setIsModalOpen(true);
    if (board) setSelectedBoard(board);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBoard("");
  };

  const deleteBoard = async (id: string) => {
    const res = await delBoard(boardId);
    if (res.data) {
      const updatedBoards = boards.filter((board) => board.id !== id);
      dispatch(setBoards(updatedBoards));
      // hot toast here board deleted
      if (boardId === id) {
        dispatch(setTasks(undefined));
        dispatch(setBoardId(""));
      }
    } else if (res.error) {
      console.log(res.error);
      // hot tast error here
    }
  };

  const handleModalSave = async (data: { boardId: string }) => {
    try {
      if (selectedBoard) {
        const res = await updateBoard({
          oldId: selectedBoard,
          id: data.boardId,
        });
        console.log(res, "res update board");
        const updated = boards.map((el) =>
          el.id === selectedBoard ? res.data : el
        );
        dispatch(setBoards(updated));

        if (boardId === selectedBoard) dispatch(setBoardId(res.data?.id));

        // hot toast updated board
      } else {
        const res = await addBoard({ id: data.boardId });
        console.log(res);

        if (res.data) {
          const updatedBoards = [...boards, res.data];
          dispatch(setBoards(updatedBoards));
          // hot toast here
        } else if (res.error) {
          console.log(res.error.data.message);
          // hot tast error here
        }
      }
      handleModalClose();
    } catch (error) {
      console.log(error);
      // hot tast error here
    }
  };

  return (
    <>
      <button
        className="btn w-fit"
        onClick={() => handleModalOpen(selectedBoard)}
      >
        Add new
      </button>

      <ul className="flex flex-wrap gap-3">
        {boards ? (
          boards.map((board) => (
            <li
              key={board.id}
              className="bg-gray-100 shadow-md rounded-sm p-3 flex justify-between w-1/4 min-w-[200px] grow"
            >
              <p>{board.id}</p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => handleModalOpen(board.id)}
                  className="hover:scale-105"
                >
                  <LiaEditSolid className="w-5 h-5" title="edit icon" />
                </button>
                <button
                  className="hover:scale-105"
                  onClick={() => deleteBoard(board.id)}
                >
                  <RiDeleteBin5Line className="w-5 h-5" title="delete icon" />
                </button>
              </div>
            </li>
          ))
        ) : (
          <div>No boards..</div>
        )}
      </ul>

      {isModalOpen && (
        <Modal
          form="boardForm"
          handleModalClose={handleModalClose}
          children={
            <BoardForm
              onsubmit={handleModalSave}
              defaultValues={{ boardId: selectedBoard }}
            />
          }
        />
      )}
    </>
  );
};

export default BoardsList;
