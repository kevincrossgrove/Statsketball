import { IGameEvent } from "@/types/GameEventTypes";
import GameAPI, { GameInfo } from "@/utils/GameAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  gameID: string;
  event: IGameEvent;
  onSuccess: () => void;
  onError: (err: string) => void;
}

export default function useCreateGameEvent() {
  const client = useQueryClient();

  const createGameEvent = useMutation({
    mutationFn: ({ gameID, event }: Props) => {
      return GameAPI.CreateGameEvent(gameID, event);
    },
    onSuccess: (updatedGame, { gameID, onSuccess }) => {
      if (!updatedGame) return;

      client.setQueryData<GameInfo>(["game", gameID], (prev) => {
        if (!prev) return prev;

        return { ...prev, game: updatedGame };
      });

      onSuccess();
    },
    onError: (_, { onError }) => {
      onError("Error saving made shot");
    },
  });

  return {
    createEvent: createGameEvent.mutate,
    creatingEvent: createGameEvent.isPending,
  };
}
