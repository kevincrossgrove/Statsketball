import AppModal, { ModalProps } from "@/components/AppModal";
import { IGameEvent } from "@/types/GameEventTypes";
import { IPlayerSchema, ITeamSchema } from "@/types/Types";
import { useEffect, useMemo, useState } from "react";
import PlayerSelector from "./PlayerSelector";
import PointsSelector from "./PointsSelector";
import { useToast } from "@/components/ui/use-toast";
import useCreateGameEvent from "../hooks/useCreateGameEvent";

interface Props extends ModalProps {
  gameID: string;
  teams: ITeamSchema[];
  defaultTeamID?: string | null;
  defaultPoints?: "2" | "3";
  otherTeamID?: string | null;
  playersMap: Record<string, IPlayerSchema>;
  newEvent: Partial<IGameEvent> | null;
  setNewEvent: React.Dispatch<
    React.SetStateAction<Partial<Partial<IGameEvent> | null>>
  >;
}

export default function MissEventModal({
  open,
  onClose,
  gameID,
  teams,
  defaultTeamID,
  otherTeamID,
  defaultPoints,
  playersMap,
  newEvent,
  setNewEvent,
}: Props) {
  const { toast } = useToast();
  const [page, setPage] = useState(0);
  const [selectedPoints, setSelectedPoints] = useState(defaultPoints);
  const { createEvent } = useCreateGameEvent();

  const selectedTeamPlayers = useMemo(() => {
    const selectedTeam = teams.find((team) => team.id === defaultTeamID);

    if (!selectedTeam) return [];

    return selectedTeam?.Players || [];
  }, [teams, defaultTeamID]);

  const otherTeamPlayers = useMemo(() => {
    const otherTeam = teams.find((team) => team.id === otherTeamID);

    if (!otherTeam) return [];

    return otherTeam?.Players || [];
  }, [teams, otherTeamID]);

  useEffect(() => {
    setSelectedPoints(defaultPoints);
  }, [defaultPoints]);

  return (
    <AppModal open={open} onClose={onClose} title={GetMissEventTitle(page)}>
      {page === 0 && (
        <div className="pt-4">
          <PlayerSelector
            players={selectedTeamPlayers}
            playersMap={playersMap}
            onSelectPlayer={selectShotMisser}
          />
          <PointsSelector
            selectedPoints={selectedPoints}
            setSelectedPoints={setSelectedPoints}
          />
        </div>
      )}
      {page === 1 && (
        <div className="pt-4">
          <PlayerSelector
            players={otherTeamPlayers}
            playersMap={playersMap}
            onSelectPlayer={selectBlocker}
            onSkip={() => selectBlocker(null)}
          />
        </div>
      )}
    </AppModal>
  );

  function handleClose() {
    setPage(0);
    onClose();
  }

  function selectShotMisser(playerID: string) {
    setNewEvent((prev) => {
      if (!prev || prev.Type !== "Miss") return null;

      return {
        ...prev,
        PlayerID: playerID,
      };
    });
    setPage(1);
  }

  function selectBlocker(playerID: string | null) {
    const eventToSave = {
      ...newEvent,
      BlockedBy: playerID,
    };

    // Save Event, show toast
    createEvent({
      gameID: gameID,
      // @ts-expect-error Needs Zod implemetation, maybe discriminated union?
      event: eventToSave,
      onSuccess: () => {
        toast({
          title: "Event Saved",
          description: "Made shot saved successfully",
          duration: 1750,
        });
      },
      onError: (err: string) => console.log(err),
    });

    handleClose();
  }
}

function GetMissEventTitle(page: number) {
  switch (page) {
    case 0:
      return "Who missed the shot?";
    case 1:
      return "Who blocked the shot?";
    default:
      return "";
  }
}
