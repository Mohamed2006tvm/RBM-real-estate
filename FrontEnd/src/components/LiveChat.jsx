import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to RBM Realestate Concierge. How may we assist you with your property search today?', sender: 'agent' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate concierge response
    setTimeout(() => {
      setIsTyping(false);
      let agentText = "Thank you for reaching out. A dedicated relationship manager has been notified and will contact you directly.";
      
      const lower = text.toLowerCase();
      if (lower.includes('buy') || lower.includes('purchase')) {
        agentText = "Excellent. We have outstanding off-market portfolios in Beverly Hills and Manhattan. Would you like to schedule a private call?";
      } else if (lower.includes('rent') || lower.includes('lease')) {
        agentText = "Certainly. We represent premium residences in London and Dubai. Let us know your preferred location and budget.";
      } else if (lower.includes('sell') || lower.includes('list')) {
        agentText = "Our marketing agency represents properties globally. We can arrange a property valuation. Can we have your phone number?";
      } else if (lower.includes('visit') || lower.includes('schedule')) {
        agentText = "We can arrange private site visits or live VR walkthroughs. Please visit our Contact page or leave your contact details here.";
      }

      setMessages((prev) => [...prev, { id: Date.now(), text: agentText, sender: 'agent' }]);
    }, 1200);
  };

  const handlePromptClick = (prompt) => {
    handleSendMessage(prompt);
  };

  const quickPrompts = [
    'Explore Off-Market Penthouses',
    'Book a Private Villa Tour',
    'Speak to an Investment Consultant',
    'List my property for sale'
  ];

  return (
    
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border/40 w-[350px] sm:w-[380px] h-[500px] rounded-md shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-primary dark:bg-dark-bg text-white p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
                    RM
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-primary rounded-full"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold font-serif tracking-wide">RBM Concierge</h4>
                  <p className="text-[10px] text-slate-400">Online | Real-time Assistance</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-secondary/10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-sm p-3.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-accent text-primary font-medium'
                        : 'bg-white dark:bg-dark-bg text-slate-800 dark:text-white border border-slate-100 dark:border-dark-border/20 shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-dark-bg border border-slate-100 dark:border-dark-border/20 rounded-sm p-3.5 text-xs text-slate-400 flex items-center space-x-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-slate-100 dark:border-dark-border/10 flex flex-wrap gap-2 bg-white dark:bg-dark-card">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handlePromptClick(prompt)}
                    className="text-[10px] bg-slate-50 hover:bg-accent/10 hover:text-accent border border-slate-200 dark:border-dark-border/30 dark:bg-dark-bg text-slate-600 dark:text-dark-text-muted px-2.5 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 border-t border-slate-100 dark:border-dark-border/20 bg-white dark:bg-dark-card flex items-center"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-grow bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-dark-border/50 text-slate-800 dark:text-white text-xs px-3.5 py-3 rounded-sm focus:outline-none focus:border-accent mr-2"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-gold-hover text-primary p-3 rounded-sm transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Bubble */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-accent hover:bg-gold-hover text-primary p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-colors duration-300 relative"
        aria-label="Toggle Live Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default LiveChat;
