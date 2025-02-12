import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";

interface ICardBtnsProps {
  handleModalOpen: () => void;
  deleteEl: () => void;
}

const CardBtns = ({ handleModalOpen, deleteEl }: ICardBtnsProps) => {
  return (
    <div className="flex gap-3 justify-end">
      <button onClick={handleModalOpen} className="hover:scale-105">
        <LiaEditSolid className="w-5 h-5" title="edit icon" />
      </button>
      <button className="hover:scale-105" onClick={deleteEl}>
        <RiDeleteBin5Line className="w-5 h-5" title="delete icon" />
      </button>
    </div>
  );
};

export default CardBtns;
