import { IPlayerSchema } from "@/types/Types";

interface PlayerSelectorProps {
  players: string[];
  playersMap: Record<string, IPlayerSchema>;
  onSelectPlayer: (playerID: string) => void;
  onSkip?: () => void;
}

export default function PlayerSelector({
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
