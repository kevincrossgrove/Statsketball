import { useState } from "react";
import AppInput from "../AppInput";
import AppModal, { ModalProps } from "../AppModal";
import { Option, SelectPicker } from "../ui/selectpicker";
import { IPlayerSchema } from "@/Types";
import useItems from "@/utils/useItems";

interface Props extends ModalProps {}

export default function UpsertTeamModal({ open, onClose }: Props) {
  const [teamName, setTeamName] = useState("");
  const [location, setLocation] = useState("");
  const [teamPlayers, setTeamPlayers] = useState<string[]>([]);

  const { items: players, loading: playersLoading } = useItems<IPlayerSchema>({
    dataSource: "players",
  });

  const playerOptions: Option[] = playersLoading
    ? []
    : players?.map((player) => ({
        label: player.Name,
        value: player.id,
      }));

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={true ? "New Team" : "Editing Team"}
    >
      <AppInput type="Text" placeholder="Team Name" required={true} />
      <AppInput type="Text" placeholder="Location" required={false} />
      <SelectPicker
        placeholder="Select 5 players"
        required={true}
        options={playerOptions}
        value={""}
        onChange={(value) => setTeamPlayers((prev) => [...prev, value])}
        label="Team"
        onCreate={() => {}}
      />
    </AppModal>
  );
}
