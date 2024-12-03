import { format } from "date-fns";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import type { TCalendarActions } from "@/features/tasks/core/types";

import { Button } from "@/components/ui/button";

interface ICustomCalendarToolbar {
  date: Date;
  onNavigate: (action: TCalendarActions) => void;
}

const CustomCalendarToolbar = ({
  date,
  onNavigate,
}: ICustomCalendarToolbar) => {
  const renderDate = format(date, "MMMM yyyy");

  return (
    <div className="w-full flex justify-center items-center gap-x-2 mb-4 lg:w-auto lg:justify-start">
      <Button
        size="icon"
        variant="secondary"
        onClick={() => onNavigate("PREV")}
      >
        <ChevronLeftIcon className="size-4" />
      </Button>
      <div className="w-full h-8 flex justify-center items-center rounded-md border border-input py-2 px-3 lg:w-auto">
        <CalendarIcon className="size-4 mr-2" />
        <p className="text-sm">{renderDate}</p>
      </div>
      <Button
        size="icon"
        variant="secondary"
        onClick={() => onNavigate("NEXT")}
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
};

export default CustomCalendarToolbar;
