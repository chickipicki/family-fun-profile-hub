
import { useState } from "react";
import { Link } from "react-router-dom";
import { Profile } from "@/components/ProfileDropdown";
import Header from "@/components/Header";
import OnboardingTour from "@/components/OnboardingTour";
import KidsBanner from "@/components/KidsBanner";
import ContentCard, { Content } from "@/components/ContentCard";
import ContentFilter from "@/components/ContentFilter";
import PurchaseConfirmation from "@/components/PurchaseConfirmation";
import { Button } from "@/components/ui/button";

// Demo content for our app
const demoContent: Content[] = [
  {
    id: "1",
    title: "Пригоди у лісі",
    type: "video",
    isPremium: false,
    imageUrl: "/placeholder.svg",
    description: "Захоплива історія про дружбу і пригоди у чарівному лісі."
  },
  {
    id: "2",
    title: "Математичні головоломки",
    type: "game",
    isPremium: true,
    imageUrl: "/placeholder.svg",
    description: "Розвивайте логічне мислення з цікавими математичними головоломками."
  },
  {
    id: "3",
    title: "Енциклопедія тварин",
    type: "book",
    isPremium: false,
    imageUrl: "/placeholder.svg",
    description: "Дізнайтеся більше про цікавих тварин з усього світу."
  },
  {
    id: "4",
    title: "Космічні пригоди",
    type: "video",
    isPremium: true,
    imageUrl: "/placeholder.svg",
    description: "Захоплива подорож у космос разом з юними астронавтами."
  }
];

// Demo profiles
const demoProfiles: Profile[] = [
  {
    id: "1",
    name: "Основний",
    type: "main",
    color: "#9b87f5"
  },
  {
    id: "2",
    name: "Kids",
    type: "kids",
    color: "#33C3F0"
  },
  {
    id: "3",
    name: "Гість",
    type: "guest",
    color: "#8E9196"
  }
];

const Index = () => {
  const [activeProfile, setActiveProfile] = useState<Profile>(demoProfiles[0]);
  const [contentFilter, setContentFilter] = useState<'free' | 'premium' | 'all'>('all');
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | undefined>(undefined);
  
  const isKidsProfile = activeProfile.type === 'kids';
  
  const filteredContent = demoContent.filter(content => {
    if (contentFilter === 'all') return true;
    if (contentFilter === 'free') return !content.isPremium;
    if (contentFilter === 'premium') return content.isPremium;
    return true;
  });
  
  const handleProfileChange = (profile: Profile) => {
    setActiveProfile(profile);
    // Reset content filter when switching to kids profile
    if (profile.type === 'kids') {
      setContentFilter('free');
    } else {
      setContentFilter('all');
    }
  };
  
  const handleTryKidsSpace = () => {
    const kidsProfile = demoProfiles.find(p => p.type === 'kids');
    if (kidsProfile) {
      handleProfileChange(kidsProfile);
    }
  };
  
  const handlePurchaseRequest = (contentId: string) => {
    const content = demoContent.find(c => c.id === contentId);
    if (content) {
      setSelectedContent(content);
      setPurchaseModalOpen(true);
    }
  };
  
  const handlePurchaseConfirm = () => {
    // In a real app, this would handle the purchase logic
    console.log("Purchase confirmed for:", selectedContent?.title);
    setPurchaseModalOpen(false);
  };
  
  const handlePurchaseReject = () => {
    console.log("Purchase rejected for:", selectedContent?.title);
    setPurchaseModalOpen(false);
  };

  return (
    <div className={`min-h-screen ${isKidsProfile ? 'kids-mode' : ''}`}>
      <Header 
        activeProfile={activeProfile}
        setActiveProfile={handleProfileChange}
        profiles={demoProfiles}
      />
      
      <main className="container py-8">
        <OnboardingTour />
        
        {!isKidsProfile && (
          <KidsBanner onTryKidsSpace={handleTryKidsSpace} />
        )}
        
        <div className="flex flex-col items-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${isKidsProfile ? 'text-kids' : ''}`}>
            {isKidsProfile ? 'Kids-Space' : 'Сімейний Центр Розваг'}
          </h1>
          <p className="text-muted-foreground text-center max-w-xl">
            {isKidsProfile 
              ? 'Безпечний простір для перегляду відео, ігор і книг для дітей'
              : 'Керуйте профілями та контентом для всієї родини'}
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <ContentFilter 
            activeFilter={contentFilter}
            onChange={setContentFilter}
            isKidsProfile={isKidsProfile}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {filteredContent.map(content => (
              <ContentCard 
                key={content.id}
                content={content}
                isKidsProfile={isKidsProfile}
                onPurchase={handlePurchaseRequest}
              />
            ))}
          </div>
          
          {filteredContent.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Немає контенту за обраними фільтрами</p>
            </div>
          )}
        </div>
      </main>
      
      <PurchaseConfirmation 
        isOpen={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        content={selectedContent}
        onConfirm={handlePurchaseConfirm}
        onReject={handlePurchaseReject}
        purchaseInitiator={activeProfile.name}
      />
    </div>
  );
};

export default Index;
