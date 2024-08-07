import { useState } from "react";
import useItems from "../../utils/useItems";
import AppBasicTable from "../../components/AppBasicTable";
import AppHeader from "../../components/AppHeader";
import { ITeamSchema } from "../../Types";
import UpsertTeamModal from "../../components/modals/UpsertTeamModal";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Teams() {
  const { items: teams, loading: teamsLoading } = useItems<ITeamSchema>({
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
      />
      <UpsertTeamModal
        open={createTeamModalOpen}
        onClose={() => setCreateTeamModalOpen(false)}
      />
    </>
  );
}
