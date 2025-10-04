import { Bot, User, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/services/mockApi';

interface MessageBubbleProps {
  message: ChatMessage;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
}

const MessageBubble = ({ message, onSpeak, isSpeaking }: MessageBubbleProps) => {
  const isBot = message.role === 'assistant';

  return (
    <div
      className={`flex gap-3 mb-4 message-enter ${
        isBot ? 'justify-start' : 'justify-end'
      }`}
    >
      {isBot && (
        <div className="flex-shrink-0">
          <div className="bg-primary text-primary-foreground rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-md ${
          isBot
            ? 'bg-card text-card-foreground border border-border'
            : 'bg-chat-user text-primary-foreground'
        }`}
      >
        <p className="text-base leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>

        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.attachments.map((attachment, idx) => (
              <div
                key={idx}
                className="bg-muted/50 rounded-lg p-2 text-sm"
              >
                📎 {attachment.name}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs opacity-70">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>

          {isBot && onSpeak && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSpeak(message.content)}
              className="h-8 px-2"
            >
              {isSpeaking ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {!isBot && (
        <div className="flex-shrink-0">
          <div className="bg-accent text-accent-foreground rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
