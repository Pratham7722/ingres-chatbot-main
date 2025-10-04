import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface VoiceButtonProps {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
}

const VoiceButton = ({ isListening, onStart, onStop, disabled }: VoiceButtonProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <Button
        onClick={isListening ? onStop : onStart}
        disabled={disabled}
        className={`h-16 w-16 rounded-full shadow-lg btn-ripple transition-all ${
          isListening 
            ? 'bg-voice-active text-accent-foreground voice-active' 
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
        size="icon"
      >
        {isListening ? (
          <MicOff className="w-7 h-7" />
        ) : (
          <Mic className="w-7 h-7" />
        )}
      </Button>
      
      {isListening && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-medium text-muted-foreground animate-pulse">
            {t('listening')}
          </span>
        </div>
      )}
    </div>
  );
};

export default VoiceButton;
