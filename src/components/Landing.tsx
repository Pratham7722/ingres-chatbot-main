import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mic, Upload, MessageSquare, Globe, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

const Landing = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
  };

  const handleStart = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary rounded-full p-6 shadow-lg">
              <Sprout className="w-16 h-16 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-primary">INGRES</h1>
          <p className="text-xl text-muted-foreground">
            {t('welcome')}
          </p>
        </div>

        {/* Language Selection */}
        <Card className="p-6 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">{t('selectLanguage')}</h2>
            </div>
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full h-14 text-lg">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem 
                    key={lang.code} 
                    value={lang.code}
                    className="text-lg py-3"
                  >
                    {lang.nativeName} ({lang.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Quick Tutorial */}
        <Card className="p-6 shadow-xl bg-gradient-to-br from-card to-accent/10">
          <h3 className="text-lg font-semibold mb-4">{t('voiceTutorial')}</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <p className="text-muted-foreground">
                {t('tapToSpeak')} - Hold the microphone button
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <p className="text-muted-foreground">
                Ask about groundwater, soil, or crops
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <p className="text-muted-foreground">
                Listen to the answer or read it
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleStart}
            className="w-full h-16 text-xl btn-ripple shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Mic className="w-6 h-6 mr-3" />
            {t('talkToIngres')}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleStart}
              variant="outline"
              className="h-14 text-lg"
            >
              <Upload className="w-5 h-5 mr-2" />
              {t('uploadDocument')}
            </Button>
            <Button 
              onClick={handleStart}
              variant="outline"
              className="h-14 text-lg"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {t('typeMessage')}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Powered by INGRES • Helping farmers make informed decisions
        </p>
      </div>
    </div>
  );
};

export default Landing;
