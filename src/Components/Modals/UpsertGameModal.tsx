import { useState } from "react";
import AppInput from "../AppInput";
import AppModal, { ModalProps } from "../AppModal";
import { Button } from "../ui/button";
import { SelectPicker } from "../ui/selectpicker";

interface Props extends ModalProps {}

export default function UpsertGameModal({ open, onClose }: Props) {
  const [page, setPage] = useState(0);

  return (
    <AppModal
      title={true ? "New Game" : "Editing Game"}
      open={open}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="text-sm flex flex-col gap-1 pt-4"
      >
        {page === 0 && (
          <>
            <label>Home Team</label>
            <SelectPicker placeholder="Select a team" required={true} />
            <label>Away Team</label>
            <SelectPicker placeholder="Select a team" required={true} />
          </>
        )}

        {page === 1 && (
          <>
            <AppInput type="Text" placeholder="Event name" required={true} />

            <label>Description</label>
            <AppInput
              type="LongText"
              placeholder="Description"
              required={false}
            />

            <label>Date</label>
            <AppInput type="Date" placeholder="Date" required={true} />

            <label>Location</label>
            <AppInput type="Text" placeholder="Location" required={false} />
          </>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </AppModal>
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Submitted");
  }
}
