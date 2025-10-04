import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Landing
      welcome: "Welcome to the Personal Assistant for INGRES",
      voiceTutorial: "Voice Tutorial",
      selectLanguage: "Select Your Language",
      talkToIngres: "Talk to INGRES",
      uploadDocument: "Upload Document",
      typeMessage: "Type Message",
      
      // Chat
      newChat: "New Chat",
      typing: "Typing...",
      listening: "Listening...",
      processing: "Processing...",
      tapToSpeak: "Tap to speak",
      holdToSpeak: "Hold to speak",
      releaseToSend: "Release to send",
      
      // Quick Actions
      groundwaterLevel: "Groundwater Level",
      recommendedCrops: "Recommended Crops",
      soilType: "Soil Type",
      irrigationTips: "Irrigation Tips",
      nearbyLabs: "Nearby Labs",
      weatherInfo: "Weather Info",
      
      // Messages
      botGreeting: "Hello! I'm INGRES, your groundwater and soil assistant. How can I help you today?",
      confirmNewChat: "Start a new chat? Your current chat will be saved in history.",
      permissionMic: "Please allow microphone access to use voice input.",
      permissionLocation: "Please allow location access for region-specific information.",
      
      // Buttons
      yes: "Yes",
      no: "No",
      cancel: "Cancel",
      send: "Send",
      retry: "Retry",
      
      // Errors
      errorGeneric: "Something went wrong. Please try again.",
      errorNetwork: "Network error. Please check your connection.",
      errorNoData: "No data available for your region.",
      errorMic: "Microphone access denied.",
      errorOCR: "Could not read document. Please try voice description.",
      
      // Settings
      autoTTS: "Auto Read Responses",
      bigTextMode: "Large Text Mode",
      offlineMode: "Offline Mode",
    }
  },
  hi: {
    translation: {
      welcome: "INGRES के व्यक्तिगत सहायक में आपका स्वागत है",
      voiceTutorial: "आवाज़ ट्यूटोरियल",
      selectLanguage: "अपनी भाषा चुनें",
      talkToIngres: "INGRES से बात करें",
      uploadDocument: "दस्तावेज़ अपलोड करें",
      typeMessage: "संदेश टाइप करें",
      
      newChat: "नई चैट",
      typing: "टाइप कर रहे हैं...",
      listening: "सुन रहे हैं...",
      processing: "प्रोसेस कर रहे हैं...",
      tapToSpeak: "बोलने के लिए टैप करें",
      holdToSpeak: "बोलने के लिए दबाएं",
      releaseToSend: "भेजने के लिए छोड़ें",
      
      groundwaterLevel: "भूमिगत जल स्तर",
      recommendedCrops: "सुझाई गई फसलें",
      soilType: "मिट्टी का प्रकार",
      irrigationTips: "सिंचाई सुझाव",
      nearbyLabs: "पास की लैब",
      weatherInfo: "मौसम जानकारी",
      
      botGreeting: "नमस्ते! मैं INGRES हूँ, आपका भूमिगत जल और मिट्टी सहायक। मैं आज आपकी कैसे मदद कर सकता हूँ?",
      confirmNewChat: "नई चैट शुरू करें? आपकी वर्तमान चैट इतिहास में सहेजी जाएगी।",
      permissionMic: "कृपया आवाज़ इनपुट के लिए माइक्रोफ़ोन एक्सेस की अनुमति दें।",
      permissionLocation: "कृपया क्षेत्र-विशिष्ट जानकारी के लिए स्थान एक्सेस की अनुमति दें।",
      
      yes: "हाँ",
      no: "नहीं",
      cancel: "रद्द करें",
      send: "भेजें",
      retry: "पुनः प्रयास करें",
      
      errorGeneric: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
      errorNetwork: "नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें।",
      errorNoData: "आपके क्षेत्र के लिए कोई डेटा उपलब्ध नहीं है।",
      errorMic: "माइक्रोफ़ोन एक्सेस अस्वीकृत।",
      errorOCR: "दस्तावेज़ नहीं पढ़ा जा सका। कृपया आवाज़ विवरण का प्रयास करें।",
      
      autoTTS: "उत्तर स्वतः पढ़ें",
      bigTextMode: "बड़े टेक्स्ट मोड",
      offlineMode: "ऑफ़लाइन मोड",
    }
  },
  mr: {
    translation: {
      welcome: "INGRES च्या वैयक्तिक सहाय्यकामध्ये आपले स्वागत आहे",
      talkToIngres: "INGRES शी बोला",
      botGreeting: "नमस्कार! मी INGRES आहे, तुमचा भूजल आणि माती सहाय्यक. मी आज तुम्हाला कशी मदत करू शकतो?",
      // ... more Marathi translations
    }
  },
  // Add more languages as needed
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
