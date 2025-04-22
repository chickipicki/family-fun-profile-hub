
import { useState } from "react";
import { Button } from "@/components/ui/button";

type ContentFilterProps = {
  activeFilter: 'free' | 'premium' | 'all';
  onChange: (filter: 'free' | 'premium' | 'all') => void;
  isKidsProfile: boolean;
}

const ContentFilter = ({ activeFilter, onChange, isKidsProfile }: ContentFilterProps) => {
  return (
    <div className={`inline-flex rounded-lg p-1 mb-6 ${isKidsProfile ? 'bg-kids-light' : 'bg-secondary'}`}>
      <Button
        variant={activeFilter === 'free' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('free')}
        className={activeFilter === 'free' && isKidsProfile ? 'bg-kids text-white' : ''}
      >
        Безкоштовне
      </Button>
      
      {isKidsProfile ? null : (
        <Button
          variant={activeFilter === 'all' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange('all')}
        >
          Усе
        </Button>
      )}
      
      <Button
        variant={activeFilter === 'premium' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('premium')}
        className={activeFilter === 'premium' && isKidsProfile ? 'bg-kids text-white' : ''}
      >
        Premium
      </Button>
    </div>
  );
};

export default ContentFilter;
