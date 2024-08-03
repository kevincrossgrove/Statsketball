import { DataSources, DataSourcesNameMap } from "../../Types";
import AppModal, { ModalProps } from "../AppModal";

interface Props extends ModalProps {
  dataSource: DataSources;
}

export default function CreateItemModal({ open, onClose, dataSource }: Props) {
  const name = DataSourcesNameMap[dataSource];

  // TODO: Convert Zod Schemas to Form generically
  // TODO: Rename to UpsertItemModal, support create and update.

  return (
    <AppModal open={open} onClose={onClose}>
      <div className="py-16 px-2 text-2xl text-center">Create {name} Modal</div>
    </AppModal>
  );
}
