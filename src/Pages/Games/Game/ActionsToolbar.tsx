import { IGameEventSchema } from "@/Types";
import ActionButton from "./ActionButton";

interface Props {
  setNewEvent: (event: Partial<IGameEventSchema> | null) => void;
}

export default function ActionsToolbar({ setNewEvent }: Props) {
  return (
    <div className="bg-green p-2 min-w-64 flex gap-3">
      <ActionButton
        title="Shoot"
        onClick={() => {
          setNewEvent({});
        }}
      />
      <ActionButton
        title="Cancel"
        onClick={() => {
          setNewEvent(null);
        }}
      />
    </div>
  );
}
