import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import xSymbolSvg from "./x-symbol-svgrepo-com.svg";

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
  const courtRef = useRef<HTMLDivElement>(null);

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
    <div className="flex flex-col items-center justify-center w-screen h-screen p-12">
      <div
        className="w-full h-full bg-primary relative"
        onClick={handleClick}
        ref={courtRef}
      >
        <div className="h-10 gap-8 flex bg-white">
          <div>Game {id}</div>
          <button
            onClick={() => {
              setClicks((prev) => structuredClone(prev));
            }}
          >
            Click me
          </button>
        </div>
        {clicks.map((click, i) => {
          if (!courtRef.current) return null;

          const style: React.CSSProperties = {
            width: circleRadius,
            height: circleRadius,
            left: click.x * courtRef.current.clientWidth - offset,
            top: click.y * courtRef.current.clientHeight - offset,
            pointerEvents: "none",
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
