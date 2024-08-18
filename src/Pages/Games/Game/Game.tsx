import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import useScreenSize from "@/utils/useScreenSize";
import nbaCourtSvg from "./NBACourt.svg";
import nbaCourtMobile from "./NBACourtMobile.png";
import ShotLocation, { ClickLocation } from "./ShotLocation";
import ActionsToolbar from "./ActionsToolbar";
import { twMerge } from "tailwind-merge";
import { IGameEventSchema } from "@/Types";

const idGenerator = new ShortUniqueId();

export default function Game() {
  const { id } = useParams<{ id: string }>();
  const [clicks, setClicks] = useState<ClickLocation[]>([]);
  const [newEvent, setNewEvent] = useState<Partial<IGameEventSchema> | null>(
    null
  );

  const courtRef = useRef<HTMLImageElement>(null);
  const screenSize = useScreenSize();
  const isMobile = screenSize === "xs";

  useEffect(() => {
    const handleResize = () => {
      setClicks((prev) => structuredClone(prev));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(newEvent);

  return (
    <div className="w-screen h-screen overflow-hidden bg-primary relative">
      <div className="relative w-full h-full">
        <img
          className={twMerge(
            "bg-primary object-contain w-full max-h-screen",
            newEvent && !newEvent?.PlayerID && "animate-pulse opacity-30"
          )}
          ref={courtRef}
          src={isMobile ? nbaCourtMobile : nbaCourtSvg}
          onClick={newEvent ? undefined : handleClick}
          draggable={false}
        />
        {clicks.map((click, i) => {
          return (
            <ShotLocation
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
        <ActionsToolbar setNewEvent={setNewEvent} />
      </div>
    </div>
  );

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!courtRef.current) return;

    const xRatio = e.nativeEvent.offsetX / courtRef.current.clientWidth;
    const yRatio = e.nativeEvent.offsetY / courtRef.current.clientHeight;
    const id = idGenerator.randomUUID();

    setClicks((prev) => [
      ...prev,
      {
        id: id,
        x: isMobile ? yRatio : xRatio,
        y: isMobile ? 1 - xRatio : yRatio,
        type: "pending",
      },
    ]);
  }
}
