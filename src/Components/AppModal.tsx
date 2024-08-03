import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
}

interface Props extends ModalProps {
  children: React.ReactNode;
  dialogClassName?: string;
  className?: string;
}

export default function AppModal({
  open,
  onClose,
  children,
  dialogClassName,
  className,
}: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) modalRef.current?.showModal();
    else modalRef.current?.close();
  }, [open]);

  return (
    <dialog
      ref={modalRef}
      className={twMerge("rounded-lg max-w-md w-full", dialogClassName)}
    >
      <div className="w-full flex justify-end">
        <div
          className="pb-3 px-4 hover:bg-gray-200 font-bold text-3xl cursor-pointer flex justify-center items-center"
          onClick={onClose}
        >
          x
        </div>
      </div>
      <div className={twMerge("p-4", className)}>{children}</div>
    </dialog>
  );
}
