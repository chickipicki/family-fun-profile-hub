
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type Content = {
  id: string;
  title: string;
  type: 'video' | 'game' | 'book';
  isPremium: boolean;
  imageUrl: string;
  description: string;
}

type ContentCardProps = {
  content: Content;
  isKidsProfile: boolean;
  onPurchase?: (contentId: string) => void;
}

const ContentCard = ({ content, isKidsProfile, onPurchase }: ContentCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${isKidsProfile ? 'kids-content border-2 border-kids-light' : ''}`}>
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={content.imageUrl || "/placeholder.svg"} 
          alt={content.title} 
          className="object-cover w-full h-full"
        />
        {content.isPremium && (
          <Badge className="absolute top-2 right-2 bg-family-yellow text-black font-bold">
            Premium
          </Badge>
        )}
      </div>
      
      <CardHeader className="p-4">
        <CardTitle className={`${isKidsProfile ? 'text-xl font-rounded' : 'text-lg'}`}>
          {content.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className={`text-muted-foreground ${isKidsProfile ? 'text-base' : 'text-sm'}`}>
          {content.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Badge variant="outline" className="capitalize">
          {content.type}
        </Badge>
        
        {content.isPremium ? (
          <Button 
            variant="default" 
            size="sm"
            className={isKidsProfile ? "bg-family-blue hover:bg-blue-600" : ""}
            onClick={() => onPurchase && onPurchase(content.id)}
          >
            {isKidsProfile ? "Купити" : "Придбати"}
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            className={isKidsProfile ? "text-family-blue border-family-blue hover:bg-family-blue hover:text-white" : ""}
          >
            Дивитися
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
