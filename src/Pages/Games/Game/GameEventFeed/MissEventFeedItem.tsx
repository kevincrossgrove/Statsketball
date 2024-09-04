import { IMissEvent } from "@/types/GameEventTypes";
import { IPlayerSchema } from "@/types/Types";

interface Props {
  event: IMissEvent;
  playersMap: Record<string, IPlayerSchema>;
}

export default function MissEventFeedItem({ event, playersMap }: Props) {
  if (!event || event.Type !== "Miss") return null;

  const misser = playersMap[event.PlayerID];

  if (!misser) return null;

  const blocker = playersMap[event?.BlockedBy || ""];
  const points = event.Points;

  return (
    <>
      {misser.Name} {points} point basket missed
      {blocker ? `. Blocked by ${blocker.Name}` : ""}
    </>
  );
}
