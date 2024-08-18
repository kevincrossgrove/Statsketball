import AppModal, { ModalProps } from "@/components/AppModal";
import { ITeamSchema } from "@/types/Types";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ModalProps {
  teams: ITeamSchema[];
  defaultTeamID?: string;
}

const pageTitles = ["Who made the shot?", "Who assisted the shot?"];

export default function MadeEventModal({
  open,
  onClose,
  teams,
  defaultTeamID,
}: Props) {
  const [page, setPage] = useState(0);
  const [selectedTeamID, setSelectedTeamID] = useState(defaultTeamID);

  const selectedTeam = teams.find((team) => team.id === defaultTeamID);

  return (
    <AppModal open={open} onClose={onClose} title={pageTitles[page]}>
      {page === 0 && (
        <div>
          <TeamSelector
            teams={teams}
            selectedTeamID={selectedTeamID || teams?.[0]?.id}
            setSelectedTeamID={setSelectedTeamID}
          />
          {selectedTeam?.Players?.map((player) => (
            <div onClick={() => selectShotMaker(player)}>{player}</div>
          ))}
        </div>
      )}
      {page === 1 && <div>Team's Player List Again</div>}
    </AppModal>
  );

  function selectShotMaker(playerID: string) {
    console.log(playerID);
    setPage(1);
  }
}

interface TeamSelectorProps {
  teams: ITeamSchema[];
  selectedTeamID: string;
  setSelectedTeamID: (teamID: string) => void;
}

function TeamSelector({
  teams,
  selectedTeamID,
  setSelectedTeamID,
}: TeamSelectorProps) {
  return (
    <>
      {teams.map((team) => (
        <div
          key={team.id}
          className={twMerge("", selectedTeamID === team.id && "")}
          onClick={() => setSelectedTeamID(team.id)}
        >
          {team.Name}
        </div>
      ))}
    </>
  );
}
