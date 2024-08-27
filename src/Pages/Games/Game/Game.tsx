import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useScreenSize from "@/utils/useScreenSize";
import ActionsToolbar from "./ActionsToolbar";
import { twMerge } from "tailwind-merge";
import ShotLocation from "./ShotLocation";
import { ClickLocation, IGameEvent } from "@/types/GameEventTypes";
import MadeEventModal from "./GameEventModals/MadeEventModal";
import useGameInfo from "./useGameInfo";
import MissEventModal from "./GameEventModals/MissEventModal";

// The X and Y coordinates of the left hoop
const leftHoopX = 0.08;
const leftHoopY = 0.5;

// The X and Y coordinates of the right hoop
const rightHoopX = 1.8;
const rightHoopY = 0.5;

const courtRatio = 94 / 50;

export default function Game() {
  const { id } = useParams<{ id: string }>();
  const [clicks, setClicks] = useState<ClickLocation[]>([]);
  const [newEvent, setNewEvent] = useState<Partial<IGameEvent> | null>(null);

  // Saved game info from the Database
  const { game, teams, playersMap } = useGameInfo(id);

  console.log(game);

  // TODO: Move these to a useReducer
  const [selectedTeamID, setSelectedTeamID] = useState<string | null>(null);
  const [leftTeamID, setLeftTeamID] = useState<string | null>(null);
  const [rightTeamID, setRightTeamID] = useState<string | null>(null);

  const [courtRef, setCourtRef] = useState<HTMLImageElement | null>(null);
  const [isCourtReady, setIsCourtReady] = useState(false);

  const screenSize = useScreenSize();
  const isMobile = screenSize === "xs";
  const clickNeeded = newEvent?.ClickRequired;

  const leftTeamIdRef = useRef<string | null>(null);
  const rightTeamIdRef = useRef<string | null>(null);

  leftTeamIdRef.current = leftTeamID;
  rightTeamIdRef.current = rightTeamID;

  const leftTeam = useMemo(
    () => teams?.find((team) => team.id === leftTeamID),
    [teams, leftTeamID]
  );

  const rightTeam = useMemo(
    () => teams?.find((team) => team.id === rightTeamID),
    [teams, rightTeamID]
  );

  // The team that is NOT selected.
  const otherTeamID = useMemo(() => {
    if (!teams?.length) return null;

    return teams?.find((team) => team.id !== selectedTeamID)?.id;
  }, [teams, selectedTeamID]);

  // Setup for leftTeam / rightTeam when none has been set yet.
  useEffect(() => {
    if (leftTeamIdRef.current || rightTeamIdRef.current) return;

    if (!teams?.length) return;

    setLeftTeamID(teams?.[0]?.id);
    setRightTeamID(teams?.[1]?.id);
  }, [teams]);

  // Forces rerender of clicks when the screen is being resized
  useEffect(() => {
    const handleResize = () => {
      setClicks((prev) => structuredClone(prev));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="w-screen h-screen overflow-hidden bg-primary relative">
        <div className="relative w-full h-full">
          {clickNeeded && (
            <img
              className={twMerge(
                "bg-primary object-contain w-full max-h-screen",
                newEvent?.ClickRequired &&
                  !newEvent?.ClickLocation &&
                  "animate-pulse opacity-30"
              )}
              ref={(node) => {
                setCourtRef(node);
                setTimeout(() => setIsCourtReady(!!node));
              }}
              src={isMobile ? "/NBACourtMobile.png" : "/NBACourt.svg"}
              onClick={handleClick}
              draggable={false}
            />
          )}
          {clickNeeded &&
            clicks.map((click, i) => {
              return (
                <ShotLocation
                  key={click.id}
                  courtRef={courtRef}
                  isMobile={isMobile}
                  click={click}
                  i={i}
                />
              );
            })}

          {/* Left Hoop Marker */}
          {clickNeeded && isCourtReady && selectedTeamID === leftTeamID && (
            <ShotLocation
              courtRef={courtRef}
              isMobile={isMobile}
              click={{
                id: "Left Basketball Hoop",
                x: leftHoopX / courtRatio,
                y: leftHoopY,
                type: "Miss",
              }}
              i={100}
            />
          )}
          {/* Right Hoop Marker */}
          {clickNeeded && isCourtReady && selectedTeamID === rightTeamID && (
            <>
              <ShotLocation
                courtRef={courtRef}
                isMobile={isMobile}
                click={{
                  id: "Right Basketball Hoop",
                  x: rightHoopX / courtRatio,
                  y: rightHoopY,
                  type: "Miss",
                }}
                i={100}
              />
            </>
          )}
        </div>
        <div className="bg-primary text-white text-center">Game {id}</div>
        <div className="absolute bottom-0 left-0 flex justify-center">
          <ActionsToolbar
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            team={leftTeam || null}
            setSelectedTeamID={setSelectedTeamID}
          />
        </div>
        <div className="absolute bottom-0 right-0 flex justify-center">
          <ActionsToolbar
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            team={rightTeam || null}
            setSelectedTeamID={setSelectedTeamID}
          />
        </div>
      </div>
      <MadeEventModal
        key={teams?.[0]?.id}
        open={newEvent?.Type === "Make" && !!newEvent?.ClickLocation}
        onClose={() => setNewEvent(null)}
        teams={teams || []}
        defaultTeamID={selectedTeamID}
        playersMap={playersMap || {}}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        defaultPoints={newEvent?.Type === "Make" ? newEvent?.Points : undefined}
      />
      <MissEventModal
        open={newEvent?.Type === "Miss" && !!newEvent?.ClickLocation}
        onClose={() => setNewEvent(null)}
        teams={teams || []}
        defaultTeamID={selectedTeamID}
        otherTeamID={otherTeamID}
        playersMap={playersMap || {}}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        defaultPoints={newEvent?.Type === "Miss" ? newEvent?.Points : undefined}
      />
    </>
  );

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const eventID = newEvent?.id;
    const cRequired = newEvent?.ClickRequired;
    const cLocation = newEvent?.ClickLocation;

    // Ignore clicks when a click is not required for this event,
    // or the event already has a location
    if (!courtRef || !cRequired || cLocation || !eventID) {
      return;
    }

    const xRatio = e.nativeEvent.offsetX / courtRef.clientWidth;
    const yRatio = e.nativeEvent.offsetY / courtRef.clientHeight;

    const xRatioWarped = xRatio * courtRatio;

    const isLeftHoop = leftTeamID === selectedTeamID;

    const hoopX = isLeftHoop ? leftHoopX : rightHoopX;
    const hoopY = isLeftHoop ? leftHoopY : rightHoopY;

    const X2minusX1Squared = Math.pow(xRatioWarped - hoopX, 2);
    const Y2minusY1Squared = Math.pow(yRatio - hoopY, 2);

    const hypotenuse = Math.sqrt(X2minusX1Squared + Y2minusY1Squared);

    let points: "2" | "3" = "2";

    // Determining if the shot was a 3 pointer or not based on the hypotenuse
    if (hypotenuse > 0.49) {
      points = "3";
    } else if (isLeftHoop && xRatio < 0.164 && hypotenuse > 0.44) {
      points = "3";
    } else if (!isLeftHoop && xRatio > 0.836 && hypotenuse > 0.44) {
      points = "3";
    } else {
      points = "2";
    }

    const clickLocation: ClickLocation = {
      id: eventID,
      x: isMobile ? yRatio : xRatio,
      y: isMobile ? 1 - xRatio : yRatio,
      type: newEvent?.Type === "Make" ? "Make" : "Miss",
    };

    setNewEvent((prev) => {
      return {
        ...prev,
        ClickLocation: clickLocation,
        Points: points,
      };
    });
    setClicks((prev) => [...prev, clickLocation]);
  }
}
