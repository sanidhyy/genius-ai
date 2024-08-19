import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SITE_NAME } from "@/constants";
export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src="/logo.png" alt={`${SITE_NAME} logo`} />
    </Avatar>
  );
};
