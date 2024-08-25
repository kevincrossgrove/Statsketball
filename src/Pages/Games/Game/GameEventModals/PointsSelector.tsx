import { twMerge } from "tailwind-merge";

interface PointsSelectorProps {
  selectedPoints: "2" | "3" | undefined;
  setSelectedPoints: (points: "2" | "3") => void;
}

export default function PointsSelector({
  selectedPoints,
  setSelectedPoints,
}: PointsSelectorProps) {
  return (
    <div className="mt-4">
      <div className="text-md font-bold mb-3">Points</div>
      <div className="flex gap-2 flex-wrap">
        <div
          className={twMerge(
            "border px-5 py-2 rounded-sm cursor-pointer shadow-sm hover:bg-muted",
            selectedPoints === "2" &&
              "bg-green text-white hover:bg-green-700 hover:text-white"
          )}
          onClick={() => setSelectedPoints(selectedPoints === "2" ? "3" : "2")}
        >
          2
        </div>
        <div
          className={twMerge(
            "border px-5 py-2 rounded-sm cursor-pointer shadow-sm hover:bg-muted",
            selectedPoints === "3" &&
              "bg-green text-white hover:bg-green-700 hover:text-white"
          )}
          onClick={() => setSelectedPoints(selectedPoints === "3" ? "2" : "3")}
        >
          3
        </div>
      </div>
    </div>
  );
}
