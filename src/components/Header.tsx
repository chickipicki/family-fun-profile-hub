
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import ProfileDropdown, { Profile } from './ProfileDropdown';

type HeaderProps = {
  activeProfile: Profile;
  setActiveProfile: (profile: Profile) => void;
  profiles: Profile[];
}

const Header = ({ activeProfile, setActiveProfile, profiles }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-5">
          <Link to="/" className="flex items-center group transition hover:scale-105">
            {/* Простий логотип */}
            <span className="flex items-center justify-center bg-primary/90 rounded-full p-1.5 mr-2">
              <Home className="w-6 h-6 text-white drop-shadow-lg" />
            </span>
            <span className="sr-only">Family Fun Profile Hub</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="
                px-3 py-1.5 text-base font-semibold relative text-primary/90 hover:text-primary 
                transition rounded-lg 
                before:absolute before:-bottom-0.5 before:left-0 before:w-0 before:h-1 before:bg-primary/60
                hover:before:w-full before:transition-all before:duration-200
                after:absolute after:bottom-0.5 after:left-0 after:w-full after:h-[2px] after:bg-primary/20 after:rounded
                "
              style={{ overflow: 'hidden' }}
            >
              Головна
            </Link>
            <Link
              to="/kids-space"
              className="
                px-3 py-1.5 text-base font-semibold relative text-[#7E69AB] hover:text-kids
                transition rounded-lg
                before:absolute before:-bottom-0.5 before:left-0 before:w-0 before:h-1 before:bg-kids
                hover:before:w-full before:transition-all before:duration-200
                after:absolute after:bottom-0.5 after:left-0 after:w-full after:h-[2px] after:bg-kids/20 after:rounded
                "
              style={{ overflow: 'hidden' }}
            >
              Kids-Space
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center">
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

