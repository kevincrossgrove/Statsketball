import { useMemo, useState } from "react";
import AppInput from "../AppInput";
import AppModal, { ModalProps } from "../AppModal";
import { Option, SelectPicker } from "../ui/selectpicker";
import { IPlayerSchema, ITeamPayloadSchema, ITeamSchema } from "@/Types";
import useItems from "@/utils/useItems";
import { Button } from "../ui/button";
import useCreateItem from "@/utils/useCreateItem";
import UpsertPlayerModal from "./UpsertPlayerModal";

interface Props extends ModalProps {}

export default function UpsertTeamModal({ open, onClose }: Props) {
  const [teamName, setTeamName] = useState("");
  const [location, setLocation] = useState("");
  const [teamPlayers, setTeamPlayers] = useState<string[]>([]);
  const [createPlayerModal, setCreatePlayerModal] = useState(false);

  const { items: players, loading: playersLoading } = useItems<IPlayerSchema>({
    dataSource: "players",
  });
  const { create: createTeam, creating: creatingTeam } = useCreateItem<
    ITeamPayloadSchema,
    ITeamSchema
  >("teams");

  const playersMap = useMemo(() => {
    if (!Array.isArray(players)) return {};

    return players.reduce((acc, player) => {
      acc[player.id] = player;
      return acc;
    }, {} as Record<string, IPlayerSchema>);
  }, [players]);

  const playerOptions: Option[] = playersLoading
    ? []
    : players?.flatMap((player) => {
        if (teamPlayers.includes(player.id)) return [];

        return [
          {
            label: player.Name,
            value: player.id,
          },
        ];
      });

  return (
    <>
      <AppModal
        open={open}
        onClose={handleClose}
        title={true ? "New Team" : "Editing Team"}
      >
        <form
          onSubmit={handleSubmit}
          className="text-sm flex flex-col gap-1 pt-4"
        >
          <label>Team Name</label>
          <AppInput
            type="Text"
            placeholder="Team Name"
            required={true}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <label>Location</label>
          <AppInput
            type="Text"
            placeholder="Location"
            required={false}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label>Players</label>
          <SelectPicker
            placeholder="Select 5 players"
            required={true}
            options={playerOptions}
            value={""}
            onChange={(value) => setTeamPlayers((prev) => [...prev, value])}
            label="players"
            onCreate={() => setCreatePlayerModal(true)}
          />
          {teamPlayers.length > 0 &&
            teamPlayers.map((playerID) => {
              const player = playersMap[playerID];
              return <div>{player?.Name}</div>;
            })}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="green"
              loading={creatingTeam}
              loadingText="Saving..."
            >
              Submit
            </Button>
          </div>
        </form>
      </AppModal>
      <UpsertPlayerModal
        open={createPlayerModal}
        onClose={() => setCreatePlayerModal(false)}
        overlay={false}
      />
    </>
  );

  function handleClose() {
    setTeamName("");
    setLocation("");
    setTeamPlayers([]);
    onClose();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createTeam({
      payload: {
        Name: teamName,
        Location: location,
        Players: teamPlayers,
      },
      onSuccess: handleClose,
    });
  }
}
