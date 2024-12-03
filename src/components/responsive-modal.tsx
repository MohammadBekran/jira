import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Options } from "nuqs";
import { useMedia } from "react-use";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

type TStringStatusOpenChange = (status: string) => void;

type TBooleanOpenChange = (
  value: boolean | ((old: boolean) => boolean | null) | null,
  options?: Options
) => Promise<URLSearchParams>;

interface IResponsiveModalProps {
  children: React.ReactNode;
  open: string | boolean | null;
  onOpenChange: TStringStatusOpenChange | TBooleanOpenChange;
}

const ResponsiveModal = ({
  children,
  open,
  onOpenChange,
}: IResponsiveModalProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  const isStringStatusOpenChange = (
    fn: unknown
  ): fn is TStringStatusOpenChange =>
    typeof fn === "function" && fn.length === 1;

  const handleOpenChange = () => {
    if (isStringStatusOpenChange(onOpenChange)) onOpenChange("");
    else (onOpenChange as TBooleanOpenChange)(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={!!open} onOpenChange={handleOpenChange}>
        <VisuallyHidden asChild>
          <DialogTitle />
        </VisuallyHidden>
        <DialogContent className="overflow-y-auto w-full max-h-[85vh] p-0 border-none hide-scrollbar sm:max-w-lg">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={!!open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <VisuallyHidden asChild>
          <DialogTitle />
        </VisuallyHidden>
        <div className="overflow-y-auto max-h-[85vh] hide-scrollbar">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModal;
