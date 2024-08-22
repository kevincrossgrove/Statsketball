import ActionButton from "./ActionButton";
import ShortUniqueId from "short-unique-id";
import { IGameEvent } from "@/types/GameEventTypes";

const idGenerator = new ShortUniqueId();

interface Props {
  newEvent: Partial<IGameEvent> | null;
  setNewEvent: (event: Partial<IGameEvent> | null) => void;
  teamID: string | null;
  setSelectedTeamID: (teamID: string | null) => void;
}

// Component for adding Game Events to the Game
export default function ActionsToolbar({
  newEvent,
  setNewEvent,
  teamID,
  setSelectedTeamID,
}: Props) {
  const isAddingEvent = newEvent !== null;

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
    <div className="bg-green p-2 min-w-64 flex gap-3">
      {Actions}
      {CancelOptions}
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
