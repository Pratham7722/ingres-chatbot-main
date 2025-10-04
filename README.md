# INGRES - Groundwater & Soil Assistant

A voice-first, multilingual React application for providing groundwater, soil type, and land information to farmers and industries.

## 🌾 Features

- **Voice-First Interface**: Powered by Web Speech API for speech recognition and synthesis
- **Multilingual Support**: English, Hindi, Marathi, Gujarati, Punjabi, Bengali, Tamil, Telugu, Kannada
- **Document Upload & OCR**: Mock OCR integration for soil reports and well logs
- **Chat History**: localStorage-based chat persistence
- **Accessible Design**: WCAG compliant with large touch targets and high contrast
- **Offline Ready**: Local caching of region data
- **Mobile-First**: Fully responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Modern browser with Web Speech API support (Chrome, Edge, Safari)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Running the App

1. Open http://localhost:8080
2. Select your preferred language
3. Allow microphone permission when prompted
4. Start chatting via voice or text!

## 📁 Project Structure

```
src/
├── components/
│   ├── Landing.tsx              # Onboarding & language selection
│   └── chat/
│       ├── ChatHeader.tsx       # Header with region & new chat
│       ├── MessageBubble.tsx    # Chat message display
│       ├── VoiceButton.tsx      # Microphone button with animation
│       ├── QuickActions.tsx     # Quick query chips
│       └── DocumentUpload.tsx   # File upload & OCR
├── pages/
│   └── Chat.tsx                 # Main chat interface
├── hooks/
│   ├── useSpeechRecognition.ts  # Voice input hook
│   └── useSpeechSynthesis.ts    # Text-to-speech hook
├── services/
│   └── mockApi.ts               # Mock API endpoints
├── i18n/
│   └── config.ts                # i18next configuration
└── index.css                    # Design system & animations
```

## 🔌 Connecting to Real Backend

### Mock API Endpoints

The app uses mock APIs in `src/services/mockApi.ts`. To connect to a real backend:

1. **Query Endpoint**
```typescript
// Replace mockApi.ts > sendQuery()
export const sendQuery = async (message: string, region?: string) => {
  const response = await fetch('https://your-api.com/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, region }),
  });
  return await response.json();
};
```

Expected response format:
```json
{
  "text": "Your groundwater level is 12.4m...",
  "tts": true,
  "suggestedActions": ["Irrigation Tips", "Nearby Labs"],
  "attachments": []
}
```

2. **OCR Endpoint**
```typescript
// Replace mockApi.ts > performOCR()
export const performOCR = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('https://your-api.com/ocr', {
    method: 'POST',
    body: formData,
  });
  return await response.json();
};
```

Expected response:
```json
{
  "text": "Extracted text content...",
  "confidence": 0.87
}
```

3. **Region Info Endpoint**
```typescript
export const getRegionInfo = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://your-api.com/region?lat=${lat}&lng=${lng}`
  );
  return await response.json();
};
```

## 🌍 Adding New Languages

1. Add language to `src/i18n/config.ts`:

```typescript
const resources = {
  // ... existing languages
  pa: { // Punjabi
    translation: {
      welcome: "INGRES ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
      talkToIngres: "INGRES ਨਾਲ ਗੱਲ ਕਰੋ",
      // ... more translations
    }
  }
};
```

2. Add to language selector in `src/components/Landing.tsx`:

```typescript
const languages = [
  // ... existing
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];
```

3. Update speech recognition language mapping in `src/pages/Chat.tsx`:

```typescript
const langMap = {
  en: 'en-US',
  hi: 'hi-IN',
  pa: 'pa-IN', // Add new language
};
```

## 🎨 Design System

The app uses a semantic token-based design system defined in:
- `src/index.css` - Color tokens, animations, utilities
- `tailwind.config.ts` - Tailwind extensions

### Color Tokens
- `--primary`: Forest green (#1F6E4A)
- `--accent`: Warm yellow (#F2C94C)
- `--background`: Soft cream (#FBF9F6)
- `--chat-user-bg`: User message background
- `--chat-bot-bg`: Bot message background
- `--voice-active`: Voice button active state

### Animations
- `voice-active`: Pulsing animation for mic button
- `message-enter`: Slide-up animation for new messages
- `btn-ripple`: Button press ripple effect

## 📱 Browser Support

- ✅ Chrome/Edge 80+ (full support)
- ✅ Safari 14.1+ (full support)
- ⚠️ Firefox 90+ (limited speech recognition)
- ❌ IE11 (not supported)

## 🧪 Mock Data

The app includes realistic mock responses for:
- Groundwater depth queries
- Soil type information
- Crop recommendations
- Irrigation tips
- Nearby lab locations
- Weather information

See `src/services/mockApi.ts` for full mock data.

## 🔐 Privacy & Permissions

The app requests:
- **Microphone**: For voice input (Web Speech API)
- **Location**: For region-specific data (optional)

All data processing happens client-side. No data is sent to external services without explicit user action.

## 🛠 Technologies

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **i18next** for internationalization
- **Web Speech API** for voice I/O
- **react-dropzone** for file uploads
- **Lucide React** for icons
- **localStorage** for offline data

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions welcome! Key areas:
- Additional language translations
- Improved voice recognition accuracy
- Offline data caching strategies
- Accessibility improvements

## 📞 Support

For issues or questions:
- Create a GitHub issue
- Email: support@ingres.example.com
- Community forum: forum.ingres.example.com

---

Built with ❤️ for Indian farmers
