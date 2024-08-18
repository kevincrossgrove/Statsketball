import { IPlayerSchema } from "../../types/Types";
import useItems from "../../utils/useItems";
import AppHeader from "../../components/AppHeader";
import AppBasicTable from "../../components/AppBasicTable";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import UpsertPlayerModal from "@/components/modals/UpsertPlayerModal";
import { X } from "lucide-react";
import useDeleteItem from "@/utils/useDeleteItem";
import AppSpinner from "@/components/AppSpinner";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

export default function Players() {
  const { items: players, loading: playersLoading } = useItems<IPlayerSchema>({
    dataSource: "players",
  });
  const { delete: deletePlayer, deletingID: deletingPlayerID } =
    useDeleteItem<IPlayerSchema>({
      dataSource: "players",
    });

  const [createPlayerModal, setCreatePlayerModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <AppHeader
        backAction={() => navigate("/")}
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
        emptyMessage="No players have been added."
        CustomRenderer={(item) => {
          const itemBeingDeleted = deletingPlayerID === item.id;

          return (
            <div
              className={twMerge(
                "w-10 border flex justify-center items-center rounded-sm h-10",
                itemBeingDeleted && "cursor-not-allowed"
              )}
              onClick={
                itemBeingDeleted
                  ? undefined
                  : (e) => {
                      e.stopPropagation();
                      deletePlayer({ id: item.id });
                    }
              }
            >
              {itemBeingDeleted ? (
                <AppSpinner size="sm" color={"danger"} />
              ) : (
                <X className="text-red-500 w-6 h-6" />
              )}
            </div>
          );
        }}
      />
      <UpsertPlayerModal
        open={createPlayerModal}
        onClose={() => setCreatePlayerModal(false)}
      />
    </>
  );
}
