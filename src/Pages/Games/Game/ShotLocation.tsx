import { ClickLocation } from "@/types/GameEventTypes";

interface Props {
  courtRef: React.RefObject<HTMLImageElement>;
  isMobile: boolean;
  click: ClickLocation;
  i: number;
}

const circleRadius = 10;
const offset = circleRadius / 2;

export default function ShotLocation({ courtRef, isMobile, click, i }: Props) {
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

  if (click.type === "Miss") {
    return (
      <img src={"/XSymbol.svg"} alt="X" className="absolute" style={style} />
    );
  }

  return <div className="absolute bg-green rounded-full" style={style} />;
}
