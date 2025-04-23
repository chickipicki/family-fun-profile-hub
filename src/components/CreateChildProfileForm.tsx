
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Baby, Lollipop, Star } from "lucide-react";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Profile } from "./ProfileDropdown";

type CreateChildProfileFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateProfile: (profile: Profile) => void;
}

type FormData = {
  name: string;
  age: string;
}

const CreateChildProfileForm = ({ isOpen, onClose, onCreateProfile }: CreateChildProfileFormProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      age: ""
    }
  });

  const onSubmit = (data: FormData) => {
    if (step === 1) {
      setStep(2);
      return;
    }
    
    // Create a new profile with kids type
    const newProfile: Profile = {
      id: `kids-${Date.now()}`,
      name: data.name,
      type: 'kids',
      color: "#33C3F0"
    };
    
    onCreateProfile(newProfile);
    onClose();
    form.reset();
    setStep(1);
  };

  const handleClose = () => {
    onClose();
    form.reset();
    setStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gradient-to-b from-[#E5DEFF] to-[#D3E4FD] border-4 border-kids rounded-xl max-w-md w-full">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            {step === 1 ? (
              <div className="bg-kids text-white p-3 rounded-full">
                <Baby className="h-8 w-8" />
              </div>
            ) : (
              <div className="bg-[#FEC6A1] text-kids p-3 rounded-full">
                <Star className="h-8 w-8" />
              </div>
            )}
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-kids">
            {step === 1 ? "Створіть дитячий профіль" : "Майже готово!"}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {step === 1 
              ? "Введіть ім'я та вік дитини для створення безпечного простору"
              : "Підтвердіть інформацію для створення профілю"
            }
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 ? (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Потрібно ввести ім'я" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-kids font-semibold text-base">Ім'я дитини</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Наприклад: Марійка" 
                            className="pl-10 border-2 border-kids/50 h-12 text-base rounded-xl" 
                            {...field} 
                          />
                          <div className="absolute left-2 top-1/2 -translate-y-1/2">
                            <Baby className="h-5 w-5 text-kids" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  rules={{ 
                    required: "Потрібно ввести вік",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Вік має бути числом"
                    },
                    validate: (value) => {
                      const age = parseInt(value);
                      return (age >= 3 && age <= 12) || "Вік має бути від 3 до 12 років";
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-kids font-semibold text-base">Вік дитини</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Наприклад: 7" 
                            className="pl-10 border-2 border-kids/50 h-12 text-base rounded-xl" 
                            {...field} 
                          />
                          <div className="absolute left-2 top-1/2 -translate-y-1/2">
                            <Lollipop className="h-5 w-5 text-kids" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-kids hover:bg-kids/80 text-white font-bold text-base py-6 rounded-xl"
                  >
                    Далі
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/80 rounded-lg p-4 space-y-2 border-2 border-kids/30">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Ім'я:</span>
                    <span className="font-bold text-kids">{form.getValues("name")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Вік:</span>
                    <span className="font-bold text-kids">{form.getValues("age")} років</span>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-lg p-4 space-y-1 border-2 border-kids/30">
                  <h4 className="font-bold text-kids">Після створення профілю ви зможете:</h4>
                  <ul className="pl-5 space-y-1">
                    <li className="text-gray-600 list-disc">Встановити ліміти часу перегляду</li>
                    <li className="text-gray-600 list-disc">Обрати доступний контент</li>
                    <li className="text-gray-600 list-disc">Налаштувати безпеку</li>
                  </ul>
                </div>
              </>
            )}
            
            {step === 2 && (
              <DialogFooter className="flex space-x-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="w-1/2 border-2 border-kids text-kids hover:bg-kids/10"
                >
                  Назад
                </Button>
                <Button 
                  type="submit" 
                  className="w-1/2 bg-kids hover:bg-kids/80 text-white font-bold"
                >
                  Створити профіль
                </Button>
              </DialogFooter>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChildProfileForm;
