import { IGameEvent } from "@/types/GameEventTypes";
import GameAPI from "@/utils/GameAPI";
import { useMutation } from "@tanstack/react-query";

interface Props {
  gameID: string;
  event: IGameEvent;
  onSuccess: () => void;
  onError: (err: string) => void;
}

export default function useCreateGameEvent() {
  const createGameEvent = useMutation({
    mutationFn: ({ gameID, event }: Props) => {
      return GameAPI.CreateGameEvent(gameID, event);
    },
    onSuccess: () => {},
    onError: () => {},
  });

  return {
    createEvent: createGameEvent.mutate,
    creatingEvent: createGameEvent.isPending,
  };
}
