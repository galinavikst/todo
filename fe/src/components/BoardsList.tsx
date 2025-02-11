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
} from "@/redux/slices/apiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setBoards } from "@/redux/slices/boardSlice";

const BoardsList = () => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const { boards } = useAppSelector((state) => state.board);

  const { data: allBoards, isLoading } = useGetBoardsQuery();

  useEffect(() => {
    if (allBoards) dispatch(setBoards(allBoards));
  }, [allBoards]);

  const [addBoard, { error: addError, isLoading: addLoading }] =
    useAddBoardMutation();
  const [delBoard, { error: deleteError, isLoading: deleteLoading }] =
    useDeleteBoardMutation();

  const handleModalOpen = (board?: string | null) => {
    setIsModalOpen(true);
    if (board) setSelectedBoard(board);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBoard("");
  };

  const deleteBoard = async (boardId: string) => {
    const res = await delBoard(boardId);
    if (res.data) {
      const updatedBoards = boards.filter((board) => board.id !== boardId);
      dispatch(setBoards(updatedBoards));
      // hot toast here
    } else if (res.error) {
      console.log(res.error);
      // hot tast error here
    }
  };

  const handleModalSave = async (data: { boardId: string }) => {
    const res = await addBoard({ id: data.boardId });
    console.log(res);

    if (res.data) {
      const updatedBoards = [...boards, res.data];
      dispatch(setBoards(updatedBoards));
      // hot toast here
      handleModalClose();
    } else if (res.error) {
      console.log(res.error);
      // hot tast error here
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

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
