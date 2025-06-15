'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Heart, MessageCircle, Send, X, Sparkles, Bot, HelpCircle, Zap } from 'lucide-react';
// No need to import GoogleGenAI or data - handled by API route

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); // 'hunc' or 'seren'
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "💕 Hello! I'm your personal Cosmic Love Advisor, specially trained on Hunç & Seren's astrological compatibility. I'm here to help you with your beautiful relationship! ✨\n\nFirst, let me know who I'm talking to so I can give you the best personalized advice:\n\n🌟 Type **Hunç** if you're Hunç\n🌟 Type **Seren** if you're Seren\n\nOnce I know who you are, I can provide tailored guidance based on your unique astrological personality!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Hide tooltip after 5 seconds or when user interacts
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const generateAIResponse = async (userMessage) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          currentUser: currentUser 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      return data.response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I'm having trouble connecting to the cosmic wisdom right now. Please try again in a moment. 🌟";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessageContent = inputMessage.trim();
    const newMessage = { role: 'user', content: userMessageContent };
    
    // Check if user is identifying themselves
    if (!currentUser) {
      const message = userMessageContent.toLowerCase();
      if (message.includes('hunç') || message.includes('hunc')) {
        setCurrentUser('hunc');
        setMessages(prev => [...prev, newMessage, {
          role: 'assistant',
          content: "🦂 Hello Hunç! As a Scorpio Sun with Cancer Moon and Aquarius Rising, I understand your deep emotional nature and need for both intensity and independence. I'm here to help you navigate your relationship with Seren using insights from your astrological compatibility. ✨\n\nWhat would you like to know about your relationship today?"
        }]);
        setInputMessage('');
        return;
      } else if (message.includes('seren')) {
        setCurrentUser('seren');
        setMessages(prev => [...prev, newMessage, {
          role: 'assistant',
          content: "♍ Hello Seren! As a Virgo Sun with Gemini Moon and Aquarius Rising, I appreciate your analytical nature and need for both intellectual stimulation and practical solutions. I'm here to help you understand your beautiful connection with Hunç through your astrological compatibility. ✨\n\nWhat can I help you with in your relationship?"
        }]);
        setInputMessage('');
        return;
      } else {
        setMessages(prev => [...prev, newMessage, {
          role: 'assistant',
          content: "I didn't catch that! Please let me know who you are by typing either:\n\n🌟 **Hunç** if you're Hunç\n🌟 **Seren** if you're Seren\n\nThis will help me give you personalized advice! 💕"
        }]);
        setInputMessage('');
        return;
      }
    }
    
    // Add user message and clear input immediately
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessageContent);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an issue. Please try again. 💫" 
      }]);
    } finally {
      setIsLoading(false);
      // Re-focus the input after response
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowTooltip(false);
  };

  return (
    <>
      {/* Floating Chat Button with Tooltip */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-20 right-0 mb-2 w-64 p-3 bg-gradient-to-r from-pink-600 to-purple-700 text-white rounded-xl shadow-xl animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <Zap className="h-4 w-4 mr-1 text-yellow-300" />
                    <span className="font-semibold text-sm">New Feature!</span>
                  </div>
                  <p className="text-xs text-pink-100">
                    Ask me anything about your relationship! I know all about your astrological compatibility. 💫
                  </p>
                </div>
                <Button
                  onClick={() => setShowTooltip(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-1 h-auto min-w-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              {/* Arrow pointing to button */}
              <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-700"></div>
            </div>
          )}
          
          {/* Main Chat Button */}
          <Button
            onClick={handleOpenChat}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-rose-500 hover:from-pink-600 hover:via-purple-700 hover:to-rose-600 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            <div className="relative">
              <MessageCircle className="h-8 w-8 text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-pink-300 animate-ping opacity-75"></div>
            </div>
          </Button>
        </div>
      )}

             {/* Compact Chat Interface */}
       {isOpen && (
         <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] h-[480px] max-h-[calc(100vh-3rem)]">
           <Card className="h-full bg-white/95 backdrop-blur-lg border-2 border-pink-200 shadow-2xl rounded-2xl overflow-hidden relative">
             {/* Compact Header with Close Button */}
             <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-pink-400 to-purple-500 p-3 rounded-t-2xl">
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                   <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                     <Sparkles className="h-3 w-3 text-white" />
                   </div>
                   <span className="text-white font-medium text-sm">Cosmic Love Advisor</span>
                 </div>
                 <Button
                   onClick={() => setIsOpen(false)}
                   variant="ghost"
                   size="sm"
                   className="text-white hover:bg-white/20 rounded-full p-1 h-auto"
                 >
                   <X className="h-4 w-4" />
                 </Button>
               </div>
             </div>

             <CardContent className="p-0 h-full flex flex-col bg-gradient-to-b from-pink-50/30 to-purple-50/30 pt-12">
                            {/* Compact Messages Area */}
              <ScrollArea className="flex-1 p-3 max-h-[320px]">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                            : 'bg-white border border-pink-200 text-gray-800 shadow-sm'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex items-center mb-1">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center mr-2">
                              <Sparkles className="h-2 w-2 text-white" />
                            </div>
                            <span className="text-xs font-medium text-purple-600">
                              Cosmic Advisor
                            </span>
                          </div>
                        )}
                        <p className="text-xs leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                      <div className="bg-white border border-pink-200 p-3 rounded-xl max-w-[85%] shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-purple-600 font-medium">Consulting stars...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Invisible div to scroll to */}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <Separator className="bg-gradient-to-r from-pink-200 via-purple-200 to-rose-200 h-0.5" />

              {/* Compact Input Area */}
              <div className="p-3 bg-white/80">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about your relationship... ✨"
                      className="w-full p-2 pr-8 border border-pink-200 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 text-sm"
                      rows="1"
                      disabled={isLoading}
                      autoFocus={isOpen}
                    />
                    <div className="absolute bottom-1 right-1 text-pink-400">
                      <Heart className="h-3 w-3" />
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg px-3 py-2 shadow-md transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:transform-none"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <div className="flex items-center text-xs text-gray-400">
                    <Zap className="h-3 w-3 mr-1 text-purple-400" />
                    <span>Powered by Gemini AI</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
} 