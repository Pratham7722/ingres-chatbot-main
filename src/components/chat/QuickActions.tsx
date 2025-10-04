import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Droplets, Sprout, TestTube, Waves, MapPin, Cloud } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const quickActions = [
  { key: 'groundwaterLevel', icon: Droplets, label: 'groundwaterLevel' },
  { key: 'recommendedCrops', icon: Sprout, label: 'recommendedCrops' },
  { key: 'soilType', icon: TestTube, label: 'soilType' },
  { key: 'irrigationTips', icon: Waves, label: 'irrigationTips' },
  { key: 'nearbyLabs', icon: MapPin, label: 'nearbyLabs' },
  { key: 'weatherInfo', icon: Cloud, label: 'weatherInfo' },
];

const QuickActions = ({ onAction }: QuickActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.key}
            onClick={() => onAction(t(action.label))}
            variant="outline"
            className="flex-shrink-0 h-auto py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Icon className="w-4 h-4 mr-2" />
            <span className="whitespace-nowrap">{t(action.label)}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default QuickActions;
