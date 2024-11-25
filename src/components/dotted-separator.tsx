import { cn } from "@/lib/utils";
import { TCSSProperties } from "@/core/types";

interface IDottedSeparatedProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
}

const DottedSeparated = ({
  className,
  color = "#d4d4d8",
  height = "2px",
  dotSize = "2px",
  gapSize = "6px",
  direction = "horizontal",
}: IDottedSeparatedProps) => {
  const isHorizontal = direction === "horizontal";

  const separatorStyles: TCSSProperties = {
    width: isHorizontal ? "100%" : height,
    height: isHorizontal ? height : "100%",
    backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
    backgroundSize: isHorizontal
      ? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}`
      : `${height} ${parseInt(dotSize) + parseInt(gapSize)}}px`,
    backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
    backgroundPosition: "center",
  };

  return (
    <div
      className={cn(
        isHorizontal
          ? "w-full flex items-center"
          : "h-full flex flex-col items-center",
        className
      )}
    >
      <div
        className={isHorizontal ? "flex-grow" : "flex-grow-0"}
        style={separatorStyles}
      />
    </div>
  );
};

export default DottedSeparated;
