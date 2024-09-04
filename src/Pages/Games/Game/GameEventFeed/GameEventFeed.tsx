import { IGameSchema, IPlayerSchema } from "@/types/Types";
import MakeEventFeedItem from "./MakeEventFeedItem";
import MissEventFeedItem from "./MissEventFeedItem";

interface Props {
  game: IGameSchema | null;
  loading: boolean;
  playersMap: Record<string, IPlayerSchema> | null;
}

export default function GameEventFeed({ game, loading, playersMap }: Props) {
  if (loading || !playersMap) return "Loading...";

  const events = game?.GameEvents;

  if (!Array.isArray(events) || events.length === 0) return "No Events Added.";

  return (
    <ul className="text-white flex flex-col gap-2 items-center pt-4">
      {events.map((event) => {
        let FeedItem: React.ReactNode;

        switch (event.Type) {
          case "Make":
            FeedItem = (
              <MakeEventFeedItem event={event} playersMap={playersMap} />
            );
            break;
          case "Miss":
            FeedItem = (
              <MissEventFeedItem event={event} playersMap={playersMap} />
            );
            break;
          default:
            FeedItem = <div>Unknown Event</div>;
        }

        return (
          <li className="bg-green flex w-64 rounded p-2" key={event.id}>
            {FeedItem}
          </li>
        );
      })}
    </ul>
  );
}
