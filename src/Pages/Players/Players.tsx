import { IPlayerSchema } from "../../Types";
import useItems from "../../utils/useItems";
import AppHeader from "../../components/AppHeader";
import AppBasicTable from "../../components/AppBasicTable";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import UpsertPlayerModal from "@/components/modals/UpsertPlayerModal";

export default function Players() {
  const { items: players, loading: playersLoading } = useItems<IPlayerSchema>({
    dataSource: "players",
  });
  const [createPlayerModal, setCreatePlayerModal] = useState(false);

  return (
    <>
      <AppHeader
        title="Players"
        actions={
          <Button variant="green" onClick={() => setCreatePlayerModal(true)}>
            Create Player
          </Button>
        }
      />
      <AppBasicTable
        loading={playersLoading}
        items={players}
        getItemTitle={(player) => player.Name}
        getItemSubtitle={(game) => game.Number}
        emptyMessage="No palyers have been added."
      />
      <UpsertPlayerModal
        open={createPlayerModal}
        onClose={() => setCreatePlayerModal(false)}
      />
    </>
  );
}
