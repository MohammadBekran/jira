import type { TProjectAnalyticsResponseType } from "@/features/projects/core/types";

import AnalyticsCard from "@/components/analytics-card";
import DottedSeparator from "@/components/dotted-separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ANALYTICS_ITEMS } from "@/core/constants";

const Analytics = ({ data }: TProjectAnalyticsResponseType) => {
  const analyticsItems = ANALYTICS_ITEMS({ data });

  return (
    <ScrollArea className="w-full whitespace-nowrap shrink-0 rounded-lg border">
      <div className="w-full flex flex-row">
        {analyticsItems.map((analyticsItem, index) => (
          <div
            key={analyticsItem.value + index}
            className="flex items-center flex-1"
          >
            <AnalyticsCard
              title={analyticsItem.title}
              value={String(analyticsItem.value)}
              variant={analyticsItem.variant}
              increaseValue={analyticsItem.increaseValue}
            />
            <DottedSeparator direction="vertical" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Analytics;
