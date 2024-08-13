import { useState } from "react";
import useItems from "../../utils/useItems";
import AppBasicTable from "../../components/AppBasicTable";
import AppHeader from "../../components/AppHeader";
import { ITeamSchema } from "../../Types";
import UpsertTeamModal from "../../components/modals/UpsertTeamModal";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import useDeleteItem from "@/utils/useDeleteItem";
import AppSpinner from "@/components/AppSpinner";
import { X } from "lucide-react";

export default function Teams() {
  const { items: teams, loading: teamsLoading } = useItems<ITeamSchema>({
    dataSource: "teams",
  });
  const { delete: deleteTeam, deletingID: deletingTeamID } =
    useDeleteItem<ITeamSchema>({
      dataSource: "teams",
    });

  const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <AppHeader
        backAction={() => navigate("/")}
        title="Teams"
        actions={
          <Button variant="green" onClick={() => setCreateTeamModalOpen(true)}>
            Create Team
          </Button>
        }
      />
      <AppBasicTable
        loading={teamsLoading}
        items={teams}
        getItemTitle={(team) => team.Name}
        getItemSubtitle={(team) => team.Location}
        emptyMessage="No teams have been added."
        CustomRenderer={(item) => {
          const itemBeingDeleted = deletingTeamID === item.id;

          return (
            <div
              className={twMerge(
                "w-10 border flex justify-center items-center rounded-sm h-10 bg-white hover:bg-secondary pointer-event-auto",
                itemBeingDeleted && "cursor-not-allowed"
              )}
              onClick={
                itemBeingDeleted
                  ? undefined
                  : (e) => {
                      e.stopPropagation();
                      deleteTeam({ id: item.id });
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
      <UpsertTeamModal
        open={createTeamModalOpen}
        onClose={() => setCreateTeamModalOpen(false)}
      />
    </>
  );
}
