import ActionButton from "./ActionButton";
import ShortUniqueId from "short-unique-id";
import { IGameEvent } from "@/types/GameEventTypes";
import { ITeamSchema } from "@/types/Types";

const idGenerator = new ShortUniqueId();

interface Props {
  newEvent: Partial<IGameEvent> | null;
  setNewEvent: (event: Partial<IGameEvent> | null) => void;
  team: ITeamSchema | null;
  setSelectedTeamID: (teamID: string | null) => void;
}

// Component for adding Game Events to the Game
export default function ActionsToolbar({
  newEvent,
  setNewEvent,
  team,
  setSelectedTeamID,
}: Props) {
  const isAddingEvent = newEvent !== null;
  const teamID = team?.id || null;

  const Actions = isAddingEvent ? null : (
    <>
      <ActionButton title="Make" onClick={newMakeEvent} />
      <ActionButton title="Miss" onClick={newMissEvent} />
    </>
  );

  const CancelOptions = !isAddingEvent ? null : (
    <>
      <ActionButton
        title="Cancel"
        onClick={() => {
          setSelectedTeamID(null);
          setNewEvent(null);
        }}
      />
    </>
  );

  return (
    <div className="text-white bg-green px-2 py-1 rounded">
      {team?.Name}
      <div className="bg-green min-w-64 py-2 flex gap-3">
        {Actions}
        {CancelOptions}
      </div>
    </div>
  );

  function newMakeEvent() {
    setSelectedTeamID(teamID);
    setNewEvent({
      id: idGenerator.randomUUID(),
      Type: "Make",
      ClickRequired: true,
    });
  }

  function newMissEvent() {
    setSelectedTeamID(teamID);
    setNewEvent({
      id: idGenerator.randomUUID(),
      Type: "Miss",
      ClickRequired: true,
    });
  }
}
