import { useEffect, useState } from "react";
import AppInput from "../AppInput";
import AppModal, { ModalProps } from "../AppModal";
import { Button } from "../ui/button";
import { SelectPicker } from "../ui/selectpicker";
import { IGamePayloadSchema, IGameSchema, ITeamSchema } from "@/Types";
import useItems from "@/utils/useItems";
import useTrackingRef from "@/utils/useTrackingRef";
import dayjs from "dayjs";
import useCreateItem from "@/utils/useCreateItem";

interface Props extends ModalProps {}

/**
 * Creation Flow
 * 1. Select a home team
 * 2. Select an away team
 * --------- Next Page ----------
 * 3. Select a Date (prefilled with today's date)
 * 4. Select a Location (prefilled with the home team's location)
 * --------- Next Page ----------
 * 5. Enter the name of the event (prefilled with "away team's name" @ "home team's location")
 * 6. Enter the description (prefilled with '"away team's name" @ "home team's location" at "location" on "date"')
 */
export default function UpsertGameModal({ open, onClose }: Props) {
  const [page, setPage] = useState(0);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { create: createGame, creating: creatingGame } = useCreateItem<
    IGamePayloadSchema,
    IGameSchema
  >("games");
  const { items: teams, loading: teamsLoading } = useItems<ITeamSchema>({
    dataSource: "teams",
  });
  const teamsRef = useTrackingRef({ value: teams });

  const teamOptions = teamsLoading
    ? []
    : teams?.map((team) => ({
        label: team.Name,
        value: team.id,
      }));

  //-------- Prefilling the form from each page's selection --------
  // Home/Away Team Selection - Prefills the name / location fields.
  useEffect(() => {
    if (!homeTeam || !awayTeam) return;

    const homeValue = teamsRef.current?.find((team) => team.id === homeTeam);
    const awayValue = teamsRef.current?.find((team) => team.id === awayTeam);

    if (!homeValue || !awayValue) return;

    setLocation(homeValue.Location);
    setName(`${awayValue.Name} @ ${homeValue.Name}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeTeam, awayTeam]);

  // Date Selection - Prefills the description field.
  useEffect(() => {
    if (!location || !date) return;

    setDescription(
      `Game @ ${location} on ${dayjs(date).format("MMMM D, YYYY")}`
    );
  }, [date, location]);

  return (
    <AppModal
      title={typeof name === "string" ? "New Game" : "Editing Game"}
      open={open}
      onClose={handleClose}
    >
      <form
        onSubmit={handleSubmit}
        className="text-sm flex flex-col gap-1 pt-4"
      >
        {/* Home & Away Team Selection */}
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
        {/* Date & Location Selection */}
        {page === 1 && (
          <>
            <label>Date</label>
            <AppInput
              type="Date"
              placeholder="Date"
              required={true}
              value={date}
              onChange={setDate}
            />
            <label>Location</label>
            <AppInput
              type="Text"
              placeholder="Location"
              required={false}
              value={location}
              onChange={setLocation}
            />
          </>
        )}
        {/* Name & Description Selection */}
        {page === 2 && (
          <>
            <label>Name</label>
            <AppInput
              type="Text"
              placeholder="Event name"
              required={true}
              value={name}
              onChange={setName}
            />
            <label>Description</label>
            <AppInput
              type="LongText"
              placeholder="Description"
              required={false}
              value={description}
              onChange={setDescription}
            />
          </>
        )}
        <div className="flex justify-end gap-2 mt-4">
          {page === 0 && (
            <>
              <Button variant="outline" onClick={handleClose}>
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
              <Button onClick={onNext}>Next</Button>
            </>
          )}

          {page === 2 && (
            <>
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button
                type="submit"
                variant="green"
                loading={creatingGame}
                loadingText="Saving..."
              >
                Submit
              </Button>
            </>
          )}
        </div>
      </form>
    </AppModal>
  );

  function handleClose() {
    setHomeTeam("");
    setAwayTeam("");
    setDate(undefined);
    setLocation("");
    setName("");
    setDescription("");
    onClose();
  }

  function onBack() {
    setPage((prev) => prev - 1);
  }

  function onNext() {
    setPage((prev) => prev + 1);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createGame({
      payload: {
        Name: name,
        Description: description,
        Date: date?.toISOString() || "",
        Location: location,
        Teams: teamOptions.map((team) => team.value),
      },
      onSuccess: handleClose,
    });
  }
}
