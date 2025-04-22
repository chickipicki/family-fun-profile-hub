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

// Оновлений demoContent з тематичними картинками й більшим вибором
const demoContent: Content[] = [
  {
    id: "1",
    title: "Пригоди у лісі",
    type: "video",
    isPremium: false,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80",
    description: "Захоплива історія про дружбу і пригоди у чарівному лісі."
  },
  {
    id: "2",
    title: "Математичні головоломки",
    type: "game",
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    description: "Розвивайте логічне мислення з цікавими математичними головоломками."
  },
  {
    id: "3",
    title: "Енциклопедія тварин",
    type: "book",
    isPremium: false,
    imageUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&q=80",
    description: "Дізнайтеся більше про цікавих тварин з усього світу."
  },
  {
    id: "4",
    title: "Космічні пригоди",
    type: "video",
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    description: "Захоплива подорож у космос разом з юними астронавтами."
  },
  {
    id: "5",
    title: "Казки на ніч",
    type: "book",
    isPremium: false,
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80",
    description: "Колекція заспокійливих казок для читання перед сном."
  },
  {
    id: "6",
    title: "Малювання для початківців",
    type: "video",
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Навчіться малювати разом з професійними художниками."
  },
  {
    id: "7",
    title: "Вивчаємо англійську",
    type: "game",
    isPremium: false,
    imageUrl: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?auto=format&fit=crop&w=600&q=80",
    description: "Цікава гра для вивчення нових слів та фраз англійською."
  },
  {
    id: "8",
    title: "Моя перша енциклопедія",
    type: "book",
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=600&q=80",
    description: "Пізнавальні історії та факти для допитливих діток."
  },
  {
    id: "9",
    title: "Будуємо місто",
    type: "game",
    isPremium: false,
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=600&q=80",
    description: "Гра-симулятор для тих, хто мріє стати будівельником."
  },
  {
    id: "10",
    title: "Світ динозаврів",
    type: "video",
    isPremium: false,
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=600&q=80",
    description: "Пізнавальний фільм про загадковий світ динозаврів."
  },
  {
    id: "11",
    title: "Кулінарна майстерня",
    type: "video",
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80",
    description: "Навчальні відео для маленьких кухарів — готуємо здорово і весело!"
  },
  {
    id: "12",
    title: "Загадкові лабіринти",
    type: "game",
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    description: "Обери героя та проходь різнокольорові лабіринти на швидкість!"
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
