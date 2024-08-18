import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useScreenSize from "@/utils/useScreenSize";
import ActionsToolbar from "./ActionsToolbar";
import { twMerge } from "tailwind-merge";
import ShotLocation from "./ShotLocation";
import { ClickLocation, IGameEvent } from "@/types/GameEventTypes";
import MadeEventModal from "./GameEventModals/MadeEventModal";

export default function Game() {
  const { id } = useParams<{ id: string }>();
  const [clicks, setClicks] = useState<ClickLocation[]>([]);
  const [newEvent, setNewEvent] = useState<Partial<IGameEvent> | null>(null);

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
        open={newEvent?.Type === "Make" && !!newEvent?.ClickLocation}
        onClose={() => setNewEvent(null)}
        teams={[]}
        defaultTeamID={newEvent?.PlayerID}
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

    const clickLocation: ClickLocation = {
      id: eventID,
      x: isMobile ? yRatio : xRatio,
      y: isMobile ? 1 - xRatio : yRatio,
      type: newEvent.Type === "Make" ? "Make" : "Miss",
    };

    setNewEvent((prev) => ({ ...prev, ClickLocation: clickLocation }));
    setClicks((prev) => [...prev, clickLocation]);
  }
}
