
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

type KidsBannerProps = {
  onTryKidsSpace: () => void;
}

const KidsBanner = ({ onTryKidsSpace }: KidsBannerProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-kids-light to-kids p-4 rounded-lg shadow-md mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2">
        <button
          onClick={() => setDismissed(true)}
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="bg-white p-3 rounded-full shadow-md">
            <Users className="h-8 w-8 text-kids" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Спробуйте Kids-Space</h3>
            <p className="text-white/80">Безпечний простір для ваших дітей із спеціальним контентом</p>
          </div>
        </div>
        
        <Button 
          onClick={onTryKidsSpace}
          className="bg-white text-kids hover:bg-gray-100 hover:text-kids-hover"
        >
          Спробувати зараз
        </Button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-family-yellow opacity-50"></div>
      <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-family-pink opacity-50"></div>
    </div>
  );
};

export default KidsBanner;
