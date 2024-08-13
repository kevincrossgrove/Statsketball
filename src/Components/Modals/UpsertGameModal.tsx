import { useState } from "react";
import AppInput from "../AppInput";
import AppModal, { ModalProps } from "../AppModal";
import { Button } from "../ui/button";
import { SelectPicker } from "../ui/selectpicker";
import { ITeamSchema } from "@/Types";
import useItems from "@/utils/useItems";

interface Props extends ModalProps {}

export default function UpsertGameModal({ open, onClose }: Props) {
  const [page, setPage] = useState(0);
  const { items: teams, loading: teamsLoading } = useItems<ITeamSchema>({
    dataSource: "teams",
  });

  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");

  const teamOptions = teamsLoading
    ? []
    : teams?.map((team) => ({
        label: team.Name,
        value: team.id,
      }));

  return (
    <AppModal
      title={true ? "New Game" : "Editing Game"}
      open={open}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="text-sm flex flex-col gap-1 pt-4"
      >
        {page === 0 && (
          <>
            <label>Home Team</label>
            <SelectPicker
              placeholder="Select a team"
              required={true}
              options={teamOptions.filter((team) => team.value !== awayTeam)}
              value={homeTeam}
              onChange={setHomeTeam}
              label="Team"
              onCreate={() => {}}
            />
            <label>Away Team</label>
            <SelectPicker
              placeholder="Select a team"
              required={true}
              options={teamOptions.filter((team) => team.value !== homeTeam)}
              value={awayTeam}
              onChange={setAwayTeam}
              label="Team"
              onCreate={() => {}}
            />
          </>
        )}

        {page === 1 && (
          <>
            <AppInput type="Text" placeholder="Event name" required={true} />

            <label>Description</label>
            <AppInput
              type="LongText"
              placeholder="Description"
              required={false}
            />

            <label>Date</label>
            <AppInput type="Date" placeholder="Date" required={true} />

            <label>Location</label>
            <AppInput type="Text" placeholder="Location" required={false} />
          </>
        )}

        <div className="flex justify-end gap-2">
          {page === 0 && (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onNext}>Next</Button>
            </>
          )}
          {page === 1 && (
            <>
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button type="submit">Submit</Button>
            </>
          )}
        </div>
      </form>
    </AppModal>
  );

  function onBack() {
    setPage((prev) => prev - 1);
  }

  function onNext() {
    setPage((prev) => prev + 1);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
}
