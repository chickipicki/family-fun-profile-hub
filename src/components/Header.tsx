
import { Link } from 'react-router-dom';
import ProfileDropdown, { Profile } from './ProfileDropdown';

type HeaderProps = {
  activeProfile: Profile;
  setActiveProfile: (profile: Profile) => void;
  profiles: Profile[];
}

const Header = ({ activeProfile, setActiveProfile, profiles }: HeaderProps) => {
  // Kids profile presence
  const kidsProfile = profiles.find((p) => p.type === 'kids');
  const isKidsActive = activeProfile.type === 'kids';

  // Кнопка перемикання для Kids
  const handleKidsSwitch = () => {
    if (kidsProfile) setActiveProfile(kidsProfile);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        {/* Left: лого + навігація */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">Family Fun</span>
            <span className="sr-only">Family Fun Profile Hub</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Головна
            </Link>
            <Link to="/kids-space" className="text-sm font-medium text-kids hover:text-kids-hover">
              Kids-Space
            </Link>
          </nav>
        </div>
        {/* Right: Kids-btn + dropdown */}
        <div className="flex items-center gap-6">
          {/* Kids-Space Button: показувати, якщо не активний kids профіль і kids профіль існує */}
          {!isKidsActive && kidsProfile && (
            <button
              onClick={handleKidsSwitch}
              className="transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-kids/40 
                bg-kids text-white font-extrabold rounded-2xl px-7 py-3 text-xl shadow-lg border-4 border-kids 
                hover:bg-kids-hover hover:scale-105 active:scale-95"
              style={{
                minWidth: 170,
                minHeight: 56,
                letterSpacing: 1,
              }}
              aria-label="Перейти у Kids-Space"
            >
              👶 Kids-Aкаунт
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
