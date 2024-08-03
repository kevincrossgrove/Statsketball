import { useState } from "react";
import useItems from "../../API/useItems";
import AppBasicTable from "../../Components/AppBasicTable";
import AppHeader from "../../Components/AppHeader";
import CreateItemModal from "../../Components/Modals/CreateItemModal";
import { TeamSchema } from "../../Types";
import AppButton from "../../Components/AppButton";

export default function Teams() {
  const { items: teams, loading: teamsLoading } = useItems<TeamSchema>({
    dataSource: "teams",
  });
  const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false);

  return (
    <>
      <AppHeader
        title="Teams"
        actions={
          <AppButton
            color="secondary"
            onClick={() => setCreateTeamModalOpen(true)}
          >
            Create Team
          </AppButton>
        }
      />
      <AppBasicTable
        loading={teamsLoading}
        items={teams}
        getItemTitle={(team) => team.Name}
        getItemSubtitle={(team) => team.Location}
        emptyMessage="No teams have been added."
      />
      <CreateItemModal
        open={createTeamModalOpen}
        onClose={() => setCreateTeamModalOpen(false)}
        dataSource="teams"
      />
    </>
  );
}
