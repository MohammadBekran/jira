import { useMedia } from "react-use";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface IResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResponsiveModal = ({
  children,
  open,
  onOpenChange,
}: IResponsiveModalProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
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
    <Drawer open={open} onOpenChange={onOpenChange}>
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
