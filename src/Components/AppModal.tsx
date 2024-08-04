import { useEffect, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
}

interface Props extends ModalProps {
  title: string;
  children: React.ReactNode;
  dialogClassName?: string;
  className?: string;
}

export default function AppModal({
  open,
  onClose,
  title,
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
