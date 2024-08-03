import AppModal, { ModalProps } from "../AppModal";

interface Props extends ModalProps {}

export default function UpsertTeamModal({ open, onClose }: Props) {
  return (
    <AppModal open={open} onClose={onClose}>
      UpsertTeamModal
    </AppModal>
  );
}
