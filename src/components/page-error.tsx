import { AlertTriangle } from "lucide-react";

const PageError = ({ message }: { message: string }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <AlertTriangle className="size-6 mb-2 text-muted-foreground" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
};

export default PageError;
