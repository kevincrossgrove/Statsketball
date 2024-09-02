import { IGameSchema } from "@/types/Types";

interface Props {
  game: IGameSchema | null;
  loading: boolean;
}

export default function GameEventFeed({ game, loading }: Props) {
  if (loading) return "Loading...";

  const events = game?.GameEvents;

  if (!Array.isArray(events) || events.length === 0) return "No Events Added.";

  return (
    <div className="text-white flex flex-col">
      {events.map((event) => {
        return <div>{event.id}</div>;
      })}
    </div>
  );
}
