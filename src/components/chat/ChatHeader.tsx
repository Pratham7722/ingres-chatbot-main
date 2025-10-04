import { MapPin, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface ChatHeaderProps {
  region?: string;
  onNewChat: () => void;
  onMenuOpen: () => void;
}

const ChatHeader = ({ region = 'Sample Region', onNewChat, onMenuOpen }: ChatHeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className="bg-card border-b border-border px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuOpen}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div>
            <h1 className="text-xl font-bold text-primary">INGRES</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{region}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={onNewChat}
          variant="outline"
          className="h-9"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">{t('newChat')}</span>
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;
