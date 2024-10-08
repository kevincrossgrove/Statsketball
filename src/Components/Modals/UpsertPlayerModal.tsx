import { useState } from "react";
import AppInput from "../AppInput";
import AppModal, { ModalProps } from "../AppModal";
import { Button } from "../ui/button";
import useCreateItem from "@/utils/useCreateItem";
import { IPlayerPayloadSchema, IPlayerSchema } from "@/types/Types";

interface Props extends ModalProps {
  overlay?: boolean;
  onCreate?: (newPlayer: string) => void;
}

export default function UpsertPlayerModal({
  open,
  onClose,
  onCreate,
  overlay = true,
}: Props) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState<number>();
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [height, setHeight] = useState("");

  const { create: createPlayer, creating: creatingPlayer } = useCreateItem<
    IPlayerPayloadSchema,
    IPlayerSchema
  >("players");

  return (
    <AppModal
      title={typeof height === "string" ? "New Player" : "Editing Player"}
      open={open}
      onClose={onClose}
      overlay={overlay}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 text-sm pt-4"
      >
        <label>Player Name</label>
        <AppInput
          type="Text"
          placeholder="Player Name"
          required={true}
          value={name}
          onChange={setName}
        />
        <label>Player Number</label>
        <AppInput
          type="Number"
          placeholder="Number"
          required={true}
          value={number}
          onChange={setNumber}
        />
        <label>Date of Birth</label>
        <AppInput
          type="Date"
          placeholder="Date of Birth"
          required={false}
          value={dateOfBirth}
          onChange={setDateOfBirth}
        />
        <label>Height</label>
        <AppInput
          type="Text"
          placeholder="Height"
          required={false}
          value={height}
          onChange={setHeight}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="green"
            loading={creatingPlayer}
            loadingText="Saving..."
          >
            Submit
          </Button>
        </div>
      </form>
    </AppModal>
  );

  function handleClose() {
    setName("");
    setNumber(0);
    setDateOfBirth(undefined);
    setHeight("");
    onClose();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (typeof number !== "number") return;

    createPlayer({
      payload: {
        Name: name,
        Number: number,
        DateOfBirth: dateOfBirth?.toISOString(),
        Height: height,
      },
      onSuccess: (newPlayerID) => {
        handleClose();
        onCreate && onCreate(newPlayerID.id);
      },
    });
  }
}
