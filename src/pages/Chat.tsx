import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Upload as UploadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import {
  ChatMessage,
  sendQuery,
  saveChatHistory,
  createNewChat,
} from '@/services/mockApi';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageBubble from '@/components/chat/MessageBubble';
import VoiceButton from '@/components/chat/VoiceButton';
import QuickActions from '@/components/chat/QuickActions';
import DocumentUpload from '@/components/chat/DocumentUpload';

const Chat = () => {
  const { t, i18n } = useTranslation();
  const [chatId, setChatId] = useState(createNewChat());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [autoTTS, setAutoTTS] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { speak, isSpeaking, stop: stopSpeaking } = useSpeechSynthesis();
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition(i18n.language === 'hi' ? 'hi-IN' : 'en-US');

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update input text from voice transcript
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  // Save chat history
  useEffect(() => {
    if (messages.length > 0) {
      saveChatHistory(chatId, messages);
    }
  }, [messages, chatId]);

  // Send initial greeting
  useEffect(() => {
    const greeting: ChatMessage = {
      id: 'greeting',
      role: 'assistant',
      content: t('botGreeting'),
      timestamp: new Date(),
      tts: true,
    };
    setMessages([greeting]);
    
    if (autoTTS) {
      setTimeout(() => speak(t('botGreeting'), i18n.language), 500);
    }
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    resetTranscript();
    setIsLoading(true);
    stopSpeaking();

    try {
      const response = await sendQuery(text);
      
      const botMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        tts: response.tts,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Auto-speak response
      if (autoTTS && response.tts) {
        setTimeout(() => {
          speak(response.text, i18n.language === 'hi' ? 'hi-IN' : 'en-US');
        }, 300);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('errorGeneric'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceStart = () => {
    if (!browserSupportsSpeechRecognition) {
      toast.error('Browser does not support speech recognition');
      return;
    }
    startListening();
  };

  const handleVoiceStop = () => {
    stopListening();
    if (transcript.trim()) {
      handleSendMessage(transcript);
    }
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const handleNewChat = () => {
    if (messages.length > 1) {
      const confirmed = window.confirm(t('confirmNewChat'));
      if (!confirmed) return;
    }
    
    setChatId(createNewChat());
    setMessages([]);
    setInputText('');
    resetTranscript();
    stopSpeaking();
    
    // Send new greeting
    setTimeout(() => {
      const greeting: ChatMessage = {
        id: 'greeting',
        role: 'assistant',
        content: t('botGreeting'),
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }, 100);
  };

  const handleDocumentTextExtracted = (text: string, fileName: string) => {
    const message = `I've uploaded a document "${fileName}". Here's the extracted text:\n\n${text}\n\nCan you help me understand this information?`;
    handleSendMessage(message);
    setShowUpload(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader
        region="Sample Region"
        onNewChat={handleNewChat}
        onMenuOpen={() => {}}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onSpeak={speak}
              isSpeaking={isSpeaking}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card rounded-2xl px-5 py-4 shadow-md">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border bg-card/50 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <QuickActions onAction={handleQuickAction} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card px-4 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          {showUpload ? (
            <div className="space-y-3">
              <DocumentUpload onTextExtracted={handleDocumentTextExtracted} />
              <Button
                variant="outline"
                onClick={() => setShowUpload(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-end gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowUpload(true)}
                className="h-12 w-12 flex-shrink-0"
              >
                <UploadIcon className="w-5 h-5" />
              </Button>

              <div className="flex-1 flex items-end gap-3 bg-muted rounded-2xl px-4 py-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(inputText);
                    }
                  }}
                  placeholder={t('tapToSpeak') + ' or type...'}
                  className="border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isLoading || isListening}
                />
                <Button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim() || isLoading}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>

              <VoiceButton
                isListening={isListening}
                onStart={handleVoiceStart}
                onStop={handleVoiceStop}
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
