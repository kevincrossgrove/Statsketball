import { GameSchema, IGameSchema } from "../../Types";
import useItems from "../../utils/useItems";
import AppHeader from "../../components/AppHeader";
import AppBasicTable from "../../components/AppBasicTable";
import AppButton from "../../components/AppButton";
import { useState } from "react";
import UpsertGameModal from "../../components/modals/UpsertGameModal";

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
