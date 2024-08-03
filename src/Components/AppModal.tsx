import { useEffect, useRef } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
}

interface Props extends ModalProps {
  children: React.ReactNode;
}

export default function AppModal({ open, onClose, children }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) modalRef.current?.showModal();
    else modalRef.current?.close();
  }, [open]);

  return (
    <dialog ref={modalRef} className="rounded max-w-md w-full">
      <div className="w-full flex justify-end">
        <div
          className="pb-3 px-4 hover:bg-gray-200 font-bold text-3xl cursor-pointer flex justify-center items-center"
          onClick={onClose}
        >
          x
        </div>
      </div>
      {children}
    </dialog>
  );
}
