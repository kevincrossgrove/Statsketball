import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useScreenSize from "@/utils/useScreenSize";
import ActionsToolbar from "./ActionsToolbar";
import { twMerge } from "tailwind-merge";
import ShotLocation from "./ShotLocation";
import { ClickLocation, IGameEvent } from "@/types/GameEventTypes";
import MadeEventModal from "./GameEventModals/MadeEventModal";
import useGameInfo from "./useGameInfo";

// The X and Y coordinates of the hoop
const hoopX = 0.0425531914894;
const hoopY = 0.5;
const courtRatio = 94 / 50;

export default function Game() {
  const { id } = useParams<{ id: string }>();
  const [clicks, setClicks] = useState<ClickLocation[]>([]);
  const [newEvent, setNewEvent] = useState<Partial<IGameEvent> | null>(null);

  const { game, teams, playersMap } = useGameInfo(id);

  const courtRef = useRef<HTMLImageElement>(null);
  const screenSize = useScreenSize();
  const isMobile = screenSize === "xs";
  const clickNeeded = newEvent?.ClickRequired;

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
              ref={courtRef}
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
        </div>
        <div className="bg-primary text-white text-center">Game {id}</div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <ActionsToolbar newEvent={newEvent} setNewEvent={setNewEvent} />
        </div>
      </div>
      <MadeEventModal
        key={teams?.[0]?.id}
        open={newEvent?.Type === "Make" && !!newEvent?.ClickLocation}
        onClose={() => setNewEvent(null)}
        teams={teams || []}
        defaultTeamID={teams?.[0]?.id}
        playersMap={playersMap || {}}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        defaultPoints={newEvent?.Type === "Make" ? newEvent?.Points : undefined}
      />
    </>
  );

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const eventID = newEvent?.id;
    const cRequired = newEvent?.ClickRequired;
    const cLocation = newEvent?.ClickLocation;

    // Ignore clicks when a click is not required for this event,
    // or the event already has a location
    if (!courtRef.current || !cRequired || cLocation || !eventID) {
      return;
    }

    const xRatio = e.nativeEvent.offsetX / courtRef.current.clientWidth;
    const yRatio = e.nativeEvent.offsetY / courtRef.current.clientHeight;

    const xRatioWarped = xRatio * courtRatio;

    const X2minusX1Squared = Math.pow(xRatioWarped - hoopX, 2);
    const Y2minusY1Squared = Math.pow(yRatio - hoopY, 2);

    const hypotenuse = Math.sqrt(X2minusX1Squared + Y2minusY1Squared);

    console.log({ game, hypotenuse });

    const clickLocation: ClickLocation = {
      id: eventID,
      x: isMobile ? yRatio : xRatio,
      y: isMobile ? 1 - xRatio : yRatio,
      type: newEvent?.Type === "Make" ? "Make" : "Miss",
    };

    setNewEvent((prev) => ({ ...prev, ClickLocation: clickLocation }));
    setClicks((prev) => [...prev, clickLocation]);
  }
}
