
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, User, List } from "lucide-react";

type OnboardingStep = {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const OnboardingTour = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      title: "Створити дитячий профіль",
      description: "Додайте профіль для вашої дитини, щоб вона мала безпечний доступ до контенту, який відповідає її віку.",
      icon: <Users className="h-12 w-12 text-kids" />,
    },
    {
      title: "Перемкнутись на дитячий профіль",
      description: "Легко перемикайтесь між вашим профілем та профілем дитини за допомогою меню профілів.",
      icon: <User className="h-12 w-12 text-family-blue" />,
    },
    {
      title: "Переглянути безкоштовний контент",
      description: "У Kids-Space ви можете знайти безкоштовний контент, спеціально підібраний для дітей.",
      icon: <List className="h-12 w-12 text-family-orange" />,
    }
  ];

  useEffect(() => {
    // Check if this is the first visit
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto p-3 rounded-full bg-kids-light">
            {steps[currentStep].icon}
          </div>
          <DialogTitle className="text-xl font-bold text-center mt-4">
            {steps[currentStep].title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center py-4">
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 w-16 mx-1 rounded-full ${currentStep === index ? 'bg-kids' : 'bg-gray-200'}`} 
            />
          ))}
        </div>
        
        <DialogFooter className="flex flex-row justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Назад
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-kids hover:bg-kids-hover"
          >
            {currentStep < steps.length - 1 ? 'Далі' : 'Завершити'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTour;
