import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Bot, User, Sparkles,
  Palmtree, Mountain, Heart, Wallet, Globe, Star
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const suggestedQuestions = [
  { icon: Heart, text: "Best honeymoon package" },
  { icon: Wallet, text: "Trips under ₹50,000" },
  { icon: Globe, text: "Best international destinations" },
  { icon: Mountain, text: "Adventure tour recommendations" },
];

const botResponses: Record<string, string> = {
  "best honeymoon package": "Our top honeymoon packages include: 1) Maldives Paradise (₹1,25,000) - Overwater villas & private dinners, 2) Santorini Romance (₹1,45,000) - Sunset cruises & caldera views, 3) Bali Island Escape (₹95,000) - Private pool villas. Would you like more details on any of these?",
  "trips under ₹50,000": "Great budget-friendly options: 1) Kerala Backwaters (₹45,000) - 5D/4N houseboat experience, 2) Goa Beach Paradise (₹35,000) - 4D/3N beach resort, 3) Himachal Adventure (₹28,000) - 6D/5N mountain trek. All include meals and transfers!",
  "best international destinations": "Top international picks: Maldives, Japan, Switzerland, Bali, Greece, Thailand. Each offers unique experiences - from tropical beaches to mountain adventures. What is your travel style?",
  "adventure tour recommendations": "Our adventure packages: 1) Swiss Alps Skiing (₹1,85,000), 2) Himalayan Trekking (₹28,000), 3) Bali Water Sports (₹95,000), 4) Andaman Diving (₹55,000). All include expert guides and equipment!",
  "default": "I would be happy to help you plan your perfect trip! You can ask me about destinations, packages, pricing, or travel tips. What would you like to know?",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key) || key.includes(lower)) {
      return response;
    }
  }
  return botResponses.default;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I am your AI travel assistant. How can I help you plan your perfect vacation today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggested = (text: string) => {
    setInput(text);
    setTimeout(() => {
      const userMessage: Message = {
        id: messages.length + 1,
        text: text,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);
      setTimeout(() => {
        const botMessage: Message = {
          id: messages.length + 2,
          text: getBotResponse(text),
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    }, 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-4 bg-ocean-500 hover:bg-ocean-600 text-white rounded-full shadow-2xl shadow-ocean-500/40 transition-colors"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageCircle size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-sunset-500 rounded-full animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white dark:bg-deep-blue rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="p-4 bg-ocean-500 text-white flex items-center gap-3">
              {/* Bot Avatar - Perfectly Circular */}
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 shadow-md">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Aadhera Assistant</h4>
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar - Perfectly Circular */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    msg.sender === 'bot' 
                      ? 'bg-ocean-100 dark:bg-ocean-900 text-ocean-600' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600'
                  }`}>
                    {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'bot'
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                      : 'bg-ocean-500 text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  {/* Bot Avatar - Perfectly Circular */}
                  <div className="w-8 h-8 rounded-full bg-ocean-100 dark:bg-ocean-900 flex items-center justify-center text-ocean-600 shrink-0 shadow-sm">
                    <Bot size={14} />
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 gap-2 mt-4"
                >
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggested(q.text)}
                      className="flex items-center gap-2 p-2.5 bg-ocean-50 dark:bg-ocean-900/30 text-ocean-700 dark:text-ocean-300 rounded-xl text-xs hover:bg-ocean-100 dark:hover:bg-ocean-900/50 transition-colors text-left"
                    >
                      <q.icon size={14} />
                      <span className="truncate">{q.text}</span>
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about destinations, packages..."
                  className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-2.5 bg-ocean-500 text-white rounded-xl hover:bg-ocean-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
