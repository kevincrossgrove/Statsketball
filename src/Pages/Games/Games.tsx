import { GameSchema, IGameSchema } from "../../Types";
import useItems from "../../API/useItems";
import AppHeader from "../../Components/AppHeader";
import AppBasicTable from "../../Components/AppBasicTable";
import AppButton from "../../Components/AppButton";
import { useState } from "react";
import UpsertGameModal from "../../Components/Modals/UpsertGameModal";

export default function Games() {
  const { items: games, loading: gamesLoading } = useItems<IGameSchema>({
    dataSource: "games",
  });
  const [createGameModalOpen, setCreateGameModalOpen] = useState(false);

  return (
    <>
      <AppHeader
        title="Games"
        actions={
          <AppButton
            color="secondary"
            onClick={() => setCreateGameModalOpen(true)}
          >
            Create Game
          </AppButton>
        }
      />
      <AppBasicTable
        loading={gamesLoading}
        items={games}
        getItemTitle={(game) => game.Name}
        getItemSubtitle={(game) => game.Date}
        emptyMessage="No games have been added."
      />
      <UpsertGameModal
        open={createGameModalOpen}
        onClose={() => setCreateGameModalOpen(false)}
      />
    </>
  );
}
