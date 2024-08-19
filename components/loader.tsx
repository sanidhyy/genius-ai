import Image from "next/image";
import { SITE_NAME } from "@/constants";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image src="/logo.png" alt={`${SITE_NAME} logo`}  fill />
      </div>

      <p className="text-sm text-muted-foreground">{SITE_NAME} is thinking...</p>
    </div>
  );
};
