
import { User, UserRound, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const ProfileDropdown = ({ 
  profiles, 
  activeProfile, 
  onProfileChange 
}: ProfileDropdownProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  
  // Highlight the profile button when needed for the tooltip
  useEffect(() => {
    if (profiles.some(p => p.type === 'kids') && activeProfile.type !== 'kids') {
      // Show the highlight after 3 seconds if main profile is active and kids profile exists
      const timer = setTimeout(() => {
        setIsHighlighted(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [profiles, activeProfile]);

  const getProfileIcon = (type: string) => {
    switch(type) {
      case 'kids':
        return <User className="h-5 w-5 text-family-blue" />;
      case 'guest':
        return <UserRound className="h-5 w-5 text-gray-500" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };
  
  const getProfileBgColor = (profile: Profile) => {
    switch(profile.type) {
      case 'kids':
        return 'bg-family-blue text-white';
      case 'guest':
        return 'bg-gray-200 text-gray-700';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="relative">
      {isHighlighted && (
        <div className="absolute -top-10 right-0 bg-kids text-white p-2 rounded-lg shadow-lg animate-bounce">
          <span className="text-sm whitespace-nowrap">Додайте профіль дитини</span>
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-kids"></div>
        </div>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger className={`flex items-center space-x-2 p-2 rounded-full ${isHighlighted ? 'ring-2 ring-kids animate-pulse' : ''}`}>
          <div className={`profile-avatar ${getProfileBgColor(activeProfile)}`}>
            {activeProfile.type === 'kids' ? (
              <Users className="h-5 w-5" />
            ) : (
              <User className="h-5 w-5" />
            )}
          </div>
          <span>{activeProfile.name}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Профілі</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profiles.map((profile) => (
            <DropdownMenuItem 
              key={profile.id}
              className={`flex items-center space-x-2 cursor-pointer ${activeProfile.id === profile.id ? 'bg-secondary' : ''}`}
              onClick={() => onProfileChange(profile)}
            >
              <div className={`profile-avatar ${getProfileBgColor(profile)} w-8 h-8 flex items-center justify-center`}>
                {getProfileIcon(profile.type)}
              </div>
              <span>{profile.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="text-primary font-medium">Додати профіль</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
