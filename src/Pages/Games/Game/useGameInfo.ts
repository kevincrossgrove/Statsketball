import GameAPI, { GameInfo } from "@/utils/GameAPI";
import { useQuery } from "@tanstack/react-query";

export default function useGameInfo(gameID?: string) {
  const gameInfo = useQuery<GameInfo | null>({
    queryKey: ["game", gameID],
    queryFn: () => {
      if (!gameID) return null;

      return GameAPI.FetchGameTeamsAndPlayers(gameID);
    },
    enabled: !!gameID,
  });

  return {
    game: gameInfo.data?.game || null,
    teams: gameInfo.data?.teams || null,
    playersMap: gameInfo.data?.playersMap || null,
  };
}
