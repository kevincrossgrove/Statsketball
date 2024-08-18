import { IGameSchema } from "../../types/Types";
import useItems from "../../utils/useItems";
import AppHeader from "../../components/AppHeader";
import AppBasicTable from "../../components/AppBasicTable";

import { useState } from "react";
import UpsertGameModal from "../../components/modals/UpsertGameModal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function Games() {
  const { items: games, loading: gamesLoading } = useItems<IGameSchema>({
    dataSource: "games",
  });
  const [createGameModalOpen, setCreateGameModalOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <AppHeader
        backAction={() => navigate("/")}
        title="Games"
        actions={
          <Button variant="green" onClick={() => setCreateGameModalOpen(true)}>
            Create Game
          </Button>
        }
      />
      <AppBasicTable
        loading={gamesLoading}
        items={games}
        getItemTitle={(game) => game.Name}
        getItemSubtitle={(game) => dayjs(game.Date).format("MMMM D, YYYY")}
        emptyMessage="No games have been added."
        onClick={(item) => navigate(`/games/${item.id}`)}
      />
      <UpsertGameModal
        open={createGameModalOpen}
        onClose={() => setCreateGameModalOpen(false)}
      />
    </>
  );
}
