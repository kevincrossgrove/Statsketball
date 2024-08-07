import { useEffect, useRef } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
}

interface Props extends ModalProps {
  title: string;
  children: React.ReactNode;
  overlay?: boolean;
}

export default function AppModal({
  open,
  onClose,
  title,
  children,
  overlay = true,
}: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) modalRef.current?.showModal();
    else modalRef.current?.close();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent overlay={overlay}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
