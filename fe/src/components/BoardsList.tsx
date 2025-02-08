"use client";
import { IBoardSections } from "@/types";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import Modal from "./Modal";
import BoardForm from "./BoardForm";

interface IBoardsList {
  boards: IBoardSections;
}

const BoardsList = ({ boards }: IBoardsList) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<string>("");

  const deleteBoard = (board: string) => {
    console.log(board, "remove here");
  };

  const handleModalOpen = (board?: string | null) => {
    setIsModalOpen(true);
    if (board) setSelectedBoard(board);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBoard("");
  };

  const handleModalSave = (data: string) => {
    console.log("submit", data);
    handleModalClose();
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
        {Object.keys(boards).map((board) => (
          <li className="bg-gray-100 shadow-md rounded-sm p-3 flex justify-between w-1/4 min-w-[200px] grow">
            <p>{board}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => handleModalOpen(board)}
                className="hover:scale-105"
              >
                <LiaEditSolid className="w-5 h-5" title="edit icon" />
              </button>
              <button
                className="hover:scale-105"
                onClick={() => deleteBoard(board)}
              >
                <RiDeleteBin5Line className="w-5 h-5" title="delete icon" />
              </button>
            </div>
          </li>
        ))}
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
