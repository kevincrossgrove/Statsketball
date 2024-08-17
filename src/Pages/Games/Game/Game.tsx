import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import xSymbolSvg from "./XSymbol.svg";
import nbaCourtSvg from "./NBACourt.svg";
// import nbaCourtMobile from "./NBACourtMobile.png";

type ClickLocation = {
  type: "make" | "miss";
  x: number;
  y: number;
};

const circleRadius = 10;
const offset = circleRadius / 2;

export default function Game() {
  const { id } = useParams<{ id: string }>();
  const [clicks, setClicks] = useState<ClickLocation[]>([]);
  const courtRef = useRef<HTMLImageElement>(null);

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
    <div className="w-screen h-screen overflow-hidden bg-primary">
      <div className="relative w-full h-full">
        <img
          className="bg-primary object-contain w-full max-h-screen"
          ref={courtRef}
          src={nbaCourtSvg}
          onClick={handleClick}
          draggable={false}
        />
        {clicks.map((click, i) => {
          if (!courtRef.current) return null;

          const style: React.CSSProperties = {
            width: circleRadius,
            height: circleRadius,
            left: click.x * courtRef.current.clientWidth - offset,
            top: click.y * courtRef.current.clientHeight - offset,
            pointerEvents: "none",
            zIndex: i,
          };

          if (click.type === "miss") {
            return (
              <img
                key={i}
                src={xSymbolSvg}
                alt="X"
                className="absolute"
                style={style}
              />
            );
          }

          return (
            <div
              key={i}
              className="absolute bg-green rounded-full"
              style={style}
            />
          );
        })}
      </div>
      <div className="bg-primary text-white text-center">Game {id}</div>
    </div>
  );

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!courtRef.current) return;

    const xRatio = e.nativeEvent.offsetX / courtRef.current.clientWidth;
    const yRatio = e.nativeEvent.offsetY / courtRef.current.clientHeight;

    setClicks((prev) => [
      ...prev,
      {
        x: xRatio,
        y: yRatio,
        type: prev.length % 2 === 0 ? "make" : "miss",
      },
    ]);
  }
}
