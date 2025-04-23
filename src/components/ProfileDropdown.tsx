
import { User, Users, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CreateChildProfileForm from "./CreateChildProfileForm";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type Profile = {
  id: string;
  name: string;
  type: 'main' | 'kids' | 'guest';
  color: string;
}

type ProfileDropdownProps = {
  profiles: Profile[];
  activeProfile: Profile;
  onProfileChange: (profile: Profile) => void;
}

const profileColors = {
  main: 'bg-family-purple text-white hover:bg-purple-500 border-2 border-primary/90',
  kids: 'bg-family-blue text-white hover:bg-kids border-2 border-blue-400',
  guest: 'bg-[#FEC6A1] text-gray-700 hover:bg-orange-300 border-2 border-orange-300',
};

const ProfileDropdown = ({ 
  profiles, 
  activeProfile, 
  onProfileChange 
}: ProfileDropdownProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isAddProfileOpen, setIsAddProfileOpen] = useState(false);
  const [hasSeenTooltip, setHasSeenTooltip] = useState(false);

  useEffect(() => {
    if (profiles.some(p => p.type === 'kids') && activeProfile.type !== 'kids' && !hasSeenTooltip) {
      const timer = setTimeout(() => {
        setIsHighlighted(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsHighlighted(false);
    }
  }, [profiles, activeProfile, hasSeenTooltip]);

  const getProfileColor = (profile: Profile) => {
    switch(profile.type) {
      case 'kids':
        return profileColors.kids;
      case 'guest':
        return profileColors.guest;
      default:
        return profileColors.main;
    }
  };

  const getProfileIcon = (type: string) => {
    switch(type) {
      case 'kids':
        return <Users className="h-5 w-5" />;
      case 'guest':
        return <UserRound className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };
  
  const handleAddProfile = () => {
    setIsAddProfileOpen(true);
  };

  const handleTooltipInteraction = () => {
    setIsHighlighted(false);
    setHasSeenTooltip(true);
  };

  return (
    <div className="relative">
      {isHighlighted && !hasSeenTooltip && (
        <TooltipProvider>
          <Tooltip open={true}>
            <TooltipTrigger asChild>
              <div 
                className="absolute -top-10 right-0 bg-kids text-white p-2 rounded-lg shadow-lg animate-bounce z-50"
                onClick={handleTooltipInteraction}
              >
                <span className="text-sm whitespace-nowrap">Додайте профіль дитини</span>
                <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-kids"></div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-kids text-white">
              Натисніть, щоб додати дитячий профіль
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger className={`flex items-center space-x-2 p-2 rounded-full transition-all ${isHighlighted ? 'ring-2 ring-kids' : ''}`}>
          <Avatar className={`h-8 w-8 ${getProfileColor(activeProfile)} shadow profile-avatar`}>
            <AvatarFallback>
              {getProfileIcon(activeProfile.type)}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold">{activeProfile.name}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Профілі</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profiles.map((profile) => (
            <DropdownMenuItem 
              key={profile.id}
              className={`flex items-center space-x-2 cursor-pointer ${
                activeProfile.id === profile.id
                  ? 'border-2 border-primary bg-secondary'
                  : ''
              }`}
              onClick={() => onProfileChange(profile)}
            >
              <Avatar className={`h-8 w-8 ${getProfileColor(profile)} profile-avatar`}>
                <AvatarFallback>
                  {getProfileIcon(profile.type)}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold">{profile.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleAddProfile}>
            <span className="text-primary font-medium">Додати профіль</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <CreateChildProfileForm 
        isOpen={isAddProfileOpen}
        onClose={() => setIsAddProfileOpen(false)}
        onCreateProfile={onProfileChange}
      />
    </div>
  );
};

export default ProfileDropdown;

