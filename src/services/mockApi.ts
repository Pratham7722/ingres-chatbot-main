// Mock API service for INgres
// Replace these functions with real API calls when backend is ready

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tts?: boolean;
  attachments?: Array<{
    type: 'image' | 'pdf' | 'text';
    url: string;
    name: string;
  }>;
}

export interface ChatResponse {
  text: string;
  tts: boolean;
  suggestedActions?: string[];
  attachments?: Array<{
    type: 'image' | 'map' | 'chart';
    url: string;
    caption: string;
  }>;
}

// Mock groundwater data
const mockGroundwaterResponses: Record<string, string> = {
  'groundwater level': 'Your groundwater level is 12.4 meters below ground. This is moderate depth for your region. Recommended: planting millet or sorghum with drip irrigation.',
  'soil type': 'Your area has red laterite soil with medium fertility. Best for: cotton, pulses, and millets. Add organic manure for better yield.',
  'recommended crops': 'Based on current groundwater (12.4m) and soil type, I recommend: Millet, Cotton, Chickpea, and Sorghum. These crops need moderate water.',
  'irrigation tips': 'With 12.4m groundwater depth, use drip irrigation to save 40% water. Best timing: early morning (5-7 AM) or evening (5-7 PM).',
  'nearby labs': 'Found 3 soil testing labs near you:\n1. AgriTest Lab - 5.2 km away\n2. Farm Science Center - 8.7 km\n3. District Agriculture Office - 12 km\nWould you like directions?',
  'weather': 'Next 7 days: Partly cloudy with 30% rain chance. Temperature: 28-35°C. Good for irrigation planning.',
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sendQuery = async (message: string, region?: string): Promise<ChatResponse> => {
  // Simulate network delay
  await delay(800 + Math.random() * 400);

  const lowerMessage = message.toLowerCase();
  
  // Find matching response
  for (const [key, response] of Object.entries(mockGroundwaterResponses)) {
    if (lowerMessage.includes(key)) {
      return {
        text: response,
        tts: true,
        suggestedActions: ['Irrigation Tips', 'Nearby Labs', 'Weather Info'],
      };
    }
  }

  // Default response
  return {
    text: `I understand you're asking about "${message}". For groundwater levels, soil information, or crop recommendations in your area, please ask specific questions. I can help with:\n• Groundwater depth and quality\n• Soil type and fertility\n• Recommended crops for your region\n• Irrigation methods\n• Nearby testing labs`,
    tts: true,
    suggestedActions: ['Groundwater Level', 'Soil Type', 'Recommended Crops'],
  };
};

export const performOCR = async (file: File): Promise<{ text: string; confidence: number }> => {
  // Simulate OCR processing
  await delay(2000);

  // Mock OCR result
  return {
    text: `[Mock OCR Result from ${file.name}]\n\nGroundwater Survey Report\nLocation: Sample Region\nDepth: 15.2 meters\nWater Quality: Good\nTDS: 450 ppm\n\nRecommendation: Suitable for irrigation`,
    confidence: 0.87,
  };
};

export const getRegionInfo = async (latitude: number, longitude: number): Promise<any> => {
  await delay(500);
  
  return {
    region: 'Sample District',
    state: 'Sample State',
    groundwaterDepth: 12.4,
    soilType: 'Red Laterite',
    climate: 'Semi-arid',
  };
};

// Chat history management (localStorage)
export const saveChatHistory = (chatId: string, messages: ChatMessage[]) => {
  try {
    const history = JSON.parse(localStorage.getItem('ingres_chat_history') || '{}');
    history[chatId] = {
      messages,
      lastUpdated: new Date().toISOString(),
      region: 'Sample Region',
    };
    localStorage.setItem('ingres_chat_history', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

export const loadChatHistory = (): Record<string, any> => {
  try {
    return JSON.parse(localStorage.getItem('ingres_chat_history') || '{}');
  } catch (error) {
    console.error('Error loading chat history:', error);
    return {};
  }
};

export const createNewChat = (): string => {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
