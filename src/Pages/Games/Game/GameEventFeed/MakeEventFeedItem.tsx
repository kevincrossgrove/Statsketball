import { IMakeEvent } from "@/types/GameEventTypes";
import { IPlayerSchema } from "@/types/Types";
import { GetShortName } from "@/utils/DataUtils";

interface Props {
  event: IMakeEvent;
  playersMap: Record<string, IPlayerSchema>;
}

export default function MakeEventFeedItem({ event, playersMap }: Props) {
  if (!event || event.Type !== "Make") return null;

  const scorer = playersMap[event.PlayerID];

  if (!scorer) return null;

  const assister = playersMap[event?.AssistedBy || ""];
  const points = event.Points;
  const scorerName = GetShortName(scorer.Name);
  const assisterName = GetShortName(assister?.Name);

  return (
    <>
      {scorerName} {points} point basket made
      {assister ? `. Assisted by ${assisterName}` : ""}
    </>
  );
}
