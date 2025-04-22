
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown, { Profile } from "./ProfileDropdown";
import { Users } from "lucide-react";

type HeaderProps = {
  activeProfile: Profile;
  setActiveProfile: (profile: Profile) => void;
  profiles: Profile[];
};

const Header = ({ activeProfile, setActiveProfile, profiles }: HeaderProps) => {
  const kidsProfile = profiles.find((p) => p.type === "kids");
  const isKidsActive = activeProfile.type === "kids";
  const [animateSwitch, setAnimateSwitch] = useState(false);

  const handleKidsSwitch = () => {
    if (kidsProfile) {
      setAnimateSwitch(true);
      setTimeout(() => {
        setAnimateSwitch(false);
        setActiveProfile(kidsProfile);
      }, 450); // тривалість анімації
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
      <div className="container flex h-20 md:h-24 items-center justify-between">
        {/* Left: лого + навігація */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl md:text-3xl text-primary">Family Fun</span>
            <span className="sr-only">Family Fun Profile Hub</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-lg font-medium hover:text-primary story-link">
              Головна
            </Link>
            <Link to="/kids-space" className="text-lg font-medium text-kids hover:text-kids-hover story-link">
              Kids-Space
            </Link>
          </nav>
        </div>
        {/* Right: Kids-btn + dropdown */}
        <div className="flex items-center gap-8">
          {/* Велика Kids-Space Button: показувати, якщо не активний kids профіль і kids профіль існує */}
          {!isKidsActive && kidsProfile && (
            <button
              onClick={handleKidsSwitch}
              className={`
                flex flex-col items-center justify-center p-0 rounded-3xl bg-gradient-to-br from-kids to-sky-400 shadow-2xl border-4 border-kids
                transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-kids/70
                ${animateSwitch ? "scale-110 shadow-[0_0_40px_10px_rgba(51,195,240,0.6)] animate-pulse" : "hover:scale-105"}
              `}
              style={{
                minWidth: 160,
                minHeight: 88,
              }}
              aria-label="Перейти у Kids-Space"
            >
              <div className="flex items-center gap-2">
                <span className="relative block">
                  <Users className="w-10 h-10 text-white drop-shadow-lg" />
                  <span className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-white border-2 border-kids flex items-center justify-center text-lg shadow font-bold animate-bounce text-kids select-none">
                    👶
                  </span>
                </span>
                <span className="text-white text-2xl font-extrabold tracking-wider drop-shadow">
                  Kids
                </span>
              </div>
              <span className="text-white text-[15px] font-bold mt-1 tracking-wide opacity-90">Дитячий акаунт</span>
            </button>
          )}

          <ProfileDropdown
            profiles={profiles}
            activeProfile={activeProfile}
            onProfileChange={setActiveProfile}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

