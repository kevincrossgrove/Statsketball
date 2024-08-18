import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import xSymbolSvg from "./XSymbol.svg";
import nbaCourtSvg from "./NBACourt.svg";
import nbaCourtMobile from "./NBACourtMobile.png";
import ShortUniqueId from "short-unique-id";
import useScreenSize from "@/utils/useScreenSize";

const idGenerator = new ShortUniqueId();

type ClickLocation = {
  type: "make" | "miss";
  id: string;
  x: number;
  y: number;
};

const circleRadius = 10;
const offset = circleRadius / 2;

export default function Game() {
  const { id } = useParams<{ id: string }>();
  const [clicks, setClicks] = useState<ClickLocation[]>([]);

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

  return (
    <div className="w-screen h-screen overflow-hidden bg-primary">
      <div className="relative w-full h-full">
        <img
          className="bg-primary object-contain w-full max-h-screen"
          ref={courtRef}
          src={isMobile ? nbaCourtMobile : nbaCourtSvg}
          onClick={handleClick}
          draggable={false}
        />
        {clicks.map((click, i) => {
          if (!courtRef.current) return null;

          const courtWidth = courtRef.current.clientWidth;
          const courtHeight = courtRef.current.clientHeight;

          // const courtRatio = 1.8;
          // const screenRatio = window.innerHeight / window.innerWidth;
          // const isExtraBorder = screenRatio < courtRatio;

          // height of the screen divided by the screen ratio
          // subract
          // height of the screen divided by court ratio
          // divide by 2

          // const cH = window.innerHeight / screenRatio;
          // const oH = window.innerHeight / courtRatio;
          // const difference = cH - oH;

          // const borderOffset = isExtraBorder ? difference / 6 : 0;

          // console.log(borderOffset);

          let left = isMobile ? click.y : click.x;
          const top = isMobile ? click.x : click.y;

          left = left * courtWidth;

          const style: React.CSSProperties = {
            width: circleRadius,
            height: circleRadius,
            left: isMobile ? courtWidth - left - offset : left - offset,
            top: top * courtHeight - offset,
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
        id: idGenerator.randomUUID(),
        x: isMobile ? yRatio : xRatio,
        y: isMobile ? 1 - xRatio : yRatio,
        type: prev.length % 2 === 0 ? "make" : "miss",
      },
    ]);
  }
}
