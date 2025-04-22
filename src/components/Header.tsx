
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
        
        <div className="flex items-center gap-4">
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
