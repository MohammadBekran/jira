import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IAnalyticsCardProps {
  title: string;
  value: string;
  variant: "up" | "down";
  increaseValue: number;
}

const AnalyticsCard = ({
  title,
  value,
  variant,
  increaseValue,
}: IAnalyticsCardProps) => {
  const isUpVariant = variant === "up";

  const iconColor = isUpVariant ? "text-emerald-500" : "text-red-500";
  const increaseValueColor = isUpVariant ? "text-emerald-500" : "text-red-500";
  const Icon = isUpVariant ? FaCaretUp : FaCaretDown;

  return (
    <Card className="w-full shadow-none border-none">
      <CardHeader>
        <div className="flex items-center gap-x-2.5">
          <CardDescription className="overflow-hidden flex items-center gap-x-2 font-medium">
            <span className="text-base truncate">{title}</span>
          </CardDescription>
          <div className="flex items-center gap-x-1">
            <Icon className={cn("size-4", iconColor)} />
            <span
              className={cn(
                "text-base font-medium truncate",
                increaseValueColor
              )}
            >
              {increaseValue}
            </span>
          </div>
        </div>
        <CardTitle className="font-semibold">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default AnalyticsCard;
