import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export { cn, toast };
