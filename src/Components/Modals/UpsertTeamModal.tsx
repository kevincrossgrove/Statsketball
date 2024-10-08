import { useMemo, useState } from "react";
import AppInput from "../AppInput";
import AppModal, { ModalProps } from "../AppModal";
import { Option, SelectPicker } from "../ui/selectpicker";
import useItems from "@/utils/useItems";
import { Button } from "../ui/button";
import useCreateItem from "@/utils/useCreateItem";
import UpsertPlayerModal from "./UpsertPlayerModal";
import { X } from "lucide-react";
import { IPlayerSchema, ITeamPayloadSchema, ITeamSchema } from "@/types/Types";
import AppColorPicker from "../AppColorPicker";
import AppButton from "../AppButton";

interface Props extends ModalProps {}

export default function UpsertTeamModal({ open, onClose }: Props) {
  const [teamName, setTeamName] = useState("");
  const [location, setLocation] = useState("");
  const [teamPlayers, setTeamPlayers] = useState<string[]>([]);
  const [createPlayerModal, setCreatePlayerModal] = useState(false);
  const [colors, setColors] = useState(new Array(3).fill(""));

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
        title={typeof teamName === "string" ? "New Team" : "Editing Team"}
      >
        <form
          onSubmit={handleSubmit}
          className="text-sm flex flex-col gap-1 pt-4"
        >
          <label htmlFor="TeamName">Team Name</label>
          <AppInput
            id="TeamName"
            type="Text"
            placeholder="Team Name"
            required={true}
            value={teamName}
            onChange={setTeamName}
          />
          <label htmlFor="Location">Location</label>
          <AppInput
            id="Location"
            type="Text"
            placeholder="Location"
            required={false}
            value={location}
            onChange={setLocation}
          />
          <label htmlFor="Colors">Team Colors (Up to 3)</label>
          <div className="flex gap-2">
            <AppColorPicker
              initialColor={colors[0]}
              onChange={(newColor) => {
                setColors((prev) => [newColor, prev[1], prev[2]]);
              }}
            />
            <AppColorPicker
              initialColor={colors[1]}
              onChange={(newColor) => {
                setColors((prev) => [prev[0], newColor, prev[2]]);
              }}
            />
            <AppColorPicker
              initialColor={colors[2]}
              onChange={(newColor) => {
                setColors((prev) => [prev[0], prev[1], newColor]);
              }}
            />
          </div>
          <AppButton
            color="danger"
            type="button"
            outline
            className="w-fit mb-3 mt-1"
            onClick={() => {
              setColors(new Array(3).fill(""));
            }}
          >
            Clear Colors
          </AppButton>
          <label htmlFor="Players">Players</label>
          <SelectPicker
            id="Players"
            placeholder="Select at least 5 players"
            required={true}
            options={playerOptions}
            value={""}
            onChange={(value) => setTeamPlayers((prev) => [...prev, value])}
            label="players"
            onCreate={() => setCreatePlayerModal(true)}
            multiple={true}
          />
          {teamPlayers.length > 0 && (
            <div className="flex flex-col gap-2 mb-4">
              {teamPlayers.map((playerID) => {
                const player = playersMap[playerID];
                // Card like css styles for each player
                return (
                  <div
                    className="flex justify-between items-center border rounded p-2 hover:bg-secondary"
                    key={playerID}
                  >
                    {player?.Name}{" "}
                    <X
                      className="text-red-500 w-5 h-5 cursor-pointer"
                      onClick={() =>
                        setTeamPlayers(
                          teamPlayers.filter((p) => p !== playerID)
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
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
        onCreate={(newPlayerID) =>
          setTeamPlayers((prev) => [...prev, newPlayerID])
        }
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
