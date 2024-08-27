import AppModal, { ModalProps } from "@/components/AppModal";
import { IGameEvent } from "@/types/GameEventTypes";
import { IPlayerSchema, ITeamSchema } from "@/types/Types";
import { useEffect, useState } from "react";
import PlayerSelector from "./PlayerSelector";
import PointsSelector from "./PointsSelector";
import { useToast } from "@/components/ui/use-toast";

interface Props extends ModalProps {
  teams: ITeamSchema[];
  defaultTeamID?: string | null;
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
  const { toast } = useToast();
  const [page, setPage] = useState(0);
  const [selectedPoints, setSelectedPoints] = useState(defaultPoints);

  const selectedTeam = teams.find((team) => team.id === defaultTeamID);

  useEffect(() => {
    setSelectedPoints(defaultPoints);
  }, [defaultPoints]);

  return (
    <AppModal open={open} onClose={handleClose} title={pageTitles[page]}>
      {page === 0 && (
        <div className="pt-4">
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
        <div className="pt-4">
          <PlayerSelector
            players={
              selectedTeam?.Players?.filter((p) => p !== newEvent?.PlayerID) ||
              []
            }
            playersMap={playersMap}
            onSelectPlayer={selectAssistor}
            onSkip={() => selectAssistor(null)}
          />
        </div>
      )}
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

  function selectAssistor(playerID: string | null) {
    const eventToSave = {
      ...newEvent,
      AssistedBy: playerID,
    };

    // Save Event, show toast
    toast({
      title: "Event Saved",
      description: "Made shot saved successfully",
      duration: 1750,
    });

    handleClose();
  }
}
