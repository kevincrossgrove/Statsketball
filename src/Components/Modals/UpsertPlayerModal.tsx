import { useState } from "react";
import AppInput from "../AppInput";
import AppModal, { ModalProps } from "../AppModal";
import { Button } from "../ui/button";
import useCreateItem from "@/utils/useCreateItem";
import { IPlayerPayloadSchema, IPlayerSchema } from "@/Types";

interface Props extends ModalProps {}

export default function UpsertPlayerModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState<number>(0);
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [height, setHeight] = useState("");

  const { create: createPlayer, creating: creatingPlayer } = useCreateItem<
    IPlayerPayloadSchema,
    IPlayerSchema
  >("players");

  return (
    <AppModal
      title={true ? "New Player" : "Editing Player"}
      open={open}
      onClose={onClose}
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
          onChange={(e) => setName(e.target.value)}
        />
        <label>Player Number</label>
        <AppInput
          type="Number"
          placeholder="Number"
          required={true}
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
        <label>Date of Birth</label>
        <AppInput
          type="Date"
          placeholder="Date of Birth"
          required={false}
          value={dateOfBirth}
          onChange={(date) => setDateOfBirth(date)}
        />
        <label>Height</label>
        <AppInput
          type="Text"
          placeholder="Height"
          required={false}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="green">
            Submit
          </Button>
        </div>
      </form>
    </AppModal>
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Submitted", {
      name,
      number,
      dateOfBirth,
      height,
    });

    createPlayer({
      payload: {
        Name: name,
        Number: number,
        DateOfBirth: dateOfBirth?.toISOString(),
        Height: height,
      },
    });
  }
}
