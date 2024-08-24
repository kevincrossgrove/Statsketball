import AppModal, { ModalProps } from "@/components/AppModal";
import { IGameEvent } from "@/types/GameEventTypes";
import { IPlayerSchema, ITeamSchema } from "@/types/Types";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ModalProps {
  teams: ITeamSchema[];
  defaultTeamID?: string;
  defaultPoints?: "2" | "3";
  playersMap: Record<string, IPlayerSchema>;
  newEvent: Partial<IGameEvent> | null;
  setNewEvent: React.Dispatch<
    React.SetStateAction<Partial<Partial<IGameEvent> | null>>
  >;
}

const pageTitles = ["Who made the shot?", "Who assisted the shot?"];

export default function MadeEventModal({
  open,
  onClose,
  teams,
  defaultTeamID,
  defaultPoints,
  playersMap,
  newEvent,
  setNewEvent,
}: Props) {
  const [page, setPage] = useState(0);
  const [selectedTeamID, setSelectedTeamID] = useState(defaultTeamID);
  const [selectedPoints, setSelectedPoints] = useState(defaultPoints);

  const selectedTeam = teams.find((team) => team.id === selectedTeamID);

  useEffect(() => {
    setSelectedPoints(defaultPoints);
  }, [defaultPoints]);

  return (
    <AppModal open={open} onClose={handleClose} title={pageTitles[page]}>
      {page === 0 && (
        <div>
          <TeamSelector
            teams={teams}
            selectedTeamID={selectedTeamID || teams?.[0]?.id}
            setSelectedTeamID={setSelectedTeamID}
          />
          <PlayerSelector
            players={selectedTeam?.Players || []}
            playersMap={playersMap}
            onSelectPlayer={selectShotMaker}
          />
          <PointsSelector
            selectedPoints={selectedPoints}
            setSelectedPoints={setSelectedPoints}
          />
        </div>
      )}
      {page === 1 && (
        <div>
          <div className="flex justify-between">
            <TeamSelector
              teams={teams.filter((team) => team.id === selectedTeamID)}
              selectedTeamID={selectedTeamID || teams?.[0]?.id}
              setSelectedTeamID={setSelectedTeamID}
            />
          </div>
          <PlayerSelector
            players={
              selectedTeam?.Players?.filter((p) => p !== newEvent?.PlayerID) ||
              []
            }
            playersMap={playersMap}
            onSelectPlayer={selectAssistor}
            onSkip={() => setPage(2)}
          />
        </div>
      )}
      {page === 2 && <div>Doneski!</div>}
    </AppModal>
  );

  function handleClose() {
    setPage(0);
    onClose();
  }

  function selectShotMaker(playerID: string) {
    setNewEvent((prev) => {
      if (!prev || prev.Type !== "Make") return null;

      return {
        ...prev,
        PlayerID: playerID,
      };
    });
    setPage(1);
  }

  function selectAssistor(playerID: string) {
    setNewEvent((prev) => {
      if (!prev || prev.Type !== "Make") return null;

      return {
        ...prev,
        AssistedBy: playerID,
      };
    });
    setPage(2);
  }
}

interface TeamSelectorProps {
  teams: ITeamSchema[];
  selectedTeamID: string;
  setSelectedTeamID: (teamID: string) => void;
}

function TeamSelector({
  teams,
  selectedTeamID,
  setSelectedTeamID,
}: TeamSelectorProps) {
  return (
    <div className="flex mb-4 gap-2">
      {teams.map((team) => (
        <div
          key={team.id}
          className={twMerge(
            "cursor-pointer",
            selectedTeamID === team.id && "text-green font-bold"
          )}
          onClick={() => setSelectedTeamID(team.id)}
        >
          {team.Name}
        </div>
      ))}
    </div>
  );
}

interface PlayerSelectorProps {
  players: string[];
  playersMap: Record<string, IPlayerSchema>;
  onSelectPlayer: (playerID: string) => void;
  onSkip?: () => void;
}

function PlayerSelector({
  players,
  playersMap,
  onSelectPlayer,
  onSkip,
}: PlayerSelectorProps) {
  if (!Array.isArray(players) || players.length === 0) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {players.map((playerID) => {
        const player = playersMap[playerID];

        if (!player) return null;

        return (
          <div
            key={playerID}
            onClick={() => onSelectPlayer(playerID)}
            className="border p-4 rounded-sm cursor-pointer shadow-sm hover:bg-muted"
          >
            {player?.Name}
          </div>
        );
      })}
      {onSkip && (
        <div
          className="border p-4 rounded-sm bg-black text-white cursor-pointer shadow-sm"
          onClick={onSkip}
        >
          Nobody
        </div>
      )}
    </div>
  );
}

interface PointsSelectorProps {
  selectedPoints: "2" | "3" | undefined;
  setSelectedPoints: (points: "2" | "3") => void;
}

function PointsSelector({
  selectedPoints,
  setSelectedPoints,
}: PointsSelectorProps) {
  return (
    <div className="mt-4">
      <div className="text-md font-bold mb-3">Points</div>
      <div className="flex gap-2 flex-wrap">
        <div
          className={twMerge(
            "border px-5 py-2 rounded-sm cursor-pointer shadow-sm hover:bg-muted",
            selectedPoints === "2" &&
              "bg-green text-white hover:bg-green-700 hover:text-white"
          )}
          onClick={() => setSelectedPoints(selectedPoints === "2" ? "3" : "2")}
        >
          2
        </div>
        <div
          className={twMerge(
            "border px-5 py-2 rounded-sm cursor-pointer shadow-sm hover:bg-muted",
            selectedPoints === "3" &&
              "bg-green text-white hover:bg-green-700 hover:text-white"
          )}
          onClick={() => setSelectedPoints(selectedPoints === "3" ? "2" : "3")}
        >
          3
        </div>
      </div>
    </div>
  );
}
