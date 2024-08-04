import { useState } from "react";
import useItems from "../../utils/useItems";
import AppBasicTable from "../../components/AppBasicTable";
import AppHeader from "../../components/AppHeader";
import { ITeamSchema, TeamSchema } from "../../Types";
import AppButton from "../../components/AppButton";
import UpsertTeamModal from "../../components/modals/UpsertTeamModal";

export default function Teams() {
  const { items: teams, loading: teamsLoading } = useItems<ITeamSchema>({
    dataSource: "teams",
  });
  const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false);

  console.log(TeamSchema);

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
      <UpsertTeamModal
        open={createTeamModalOpen}
        onClose={() => setCreateTeamModalOpen(false)}
      />
    </>
  );
}
