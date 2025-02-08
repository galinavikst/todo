import { ReactNode } from "react";

interface IModalProps {
  handleModalClose: () => void;
  children: ReactNode;
  form: string;
}

const Modal = ({ handleModalClose, children, form }: IModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleModalClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed top-0 left-0 w-full h-full flex bg-black bg-opacity-50 items-center justify-center"
    >
      <div className="flex flex-col justify-between bg-white min-w-[300px] min-h-[150px] p-2 border border-solid rounded-sm border-black-600 shadow-sm ">
        {children}
        <div className="flex gap-2">
          <button className="grow btn" form={form}>
            Save
          </button>
          <button className="grow btn" onClick={handleModalClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
