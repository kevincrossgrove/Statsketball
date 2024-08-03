import AppModal, { ModalProps } from "../AppModal";

interface Props extends ModalProps {}

export default function UpsertGameModal({ open, onClose }: Props) {
  return (
    <AppModal open={open} onClose={onClose}>
      UpsertGameModal
    </AppModal>
  );
}
