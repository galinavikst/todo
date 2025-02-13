"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import BoardForm from "./BoardForm";
import {
  useAddBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsQuery,
  useUpdateBoardMutation,
} from "@/redux/slices/apiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setBoardId, setBoards } from "@/redux/slices/boardSlice";
import CardBtns from "./CardBtns";
import toast from "react-hot-toast";

const BoardsList = () => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const { boardId, boards } = useAppSelector((state) => state.board);

  const [addBoard] = useAddBoardMutation();
  const [delBoard] = useDeleteBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const { data: allBoards } = useGetBoardsQuery();

  useEffect(() => {
    if (!boards) dispatch(setBoards(allBoards));
  }, [allBoards]);

  const handleModalOpen = (board?: string | null) => {
    setIsModalOpen(true);
    if (board) setSelectedBoard(board);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBoard("");
  };

  const deleteBoard = async (id: string) => {
    try {
      const deletedBoardId = await delBoard(id).unwrap();
      const updatedBoards = boards.filter(
        (board) => board.id !== deletedBoardId
      );
      dispatch(setBoards(updatedBoards));

      if (boardId === deletedBoardId) dispatch(setBoardId(""));

      toast.success("Successfully deleted!");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleModalSave = async (data: { boardId: string }) => {
    try {
      if (selectedBoard) {
        const res = await updateBoard({
          oldId: selectedBoard,
          id: data.boardId,
        }).unwrap();

        const updated = boards.map((el) =>
          el.id === selectedBoard ? res : el
        );
        dispatch(setBoards(updated));

        if (boardId === selectedBoard) dispatch(setBoardId(res.id));
        toast.success("Successfully updated!");
      } else {
        const res = await addBoard({ id: data.boardId }).unwrap();

        const updatedBoards = [...boards, res];
        dispatch(setBoards(updatedBoards));

        toast.success("Successfully createdted!");
      }
      handleModalClose();
    } catch (error) {
      toast.error(error.data.message);
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
              <CardBtns
                deleteEl={() => deleteBoard(board.id)}
                handleModalOpen={() => handleModalOpen(board.id)}
              />
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
