import { useState, useEffect } from 'react';

const conversation = [
  { role: 'user' as const, text: 'How do I register a company in Delaware?' },
  {
    role: 'eva' as const,
    text: "For a Delaware LLC, you'll need to: 1) Choose a unique company name, 2) Appoint a Registered Agent in DE, 3) File a Certificate of Formation with the Division of Corporations ($90), 4) Create an Operating Agreement. I can guide you through each step. Shall I start?",
  },
];

export default function HeroChat() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [messages, setMessages] = useState<{ role: 'user' | 'eva'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentMsg >= conversation.length) {
      // Restart after pause
      const timeout = setTimeout(() => {
        setMessages([]);
        setCurrentMsg(0);
        setVisibleChars(0);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const msg = conversation[currentMsg];
    setIsTyping(true);

    // Delay before typing starts
    const startDelay = setTimeout(() => {
      if (visibleChars < msg.text.length) {
        const speed = msg.role === 'eva' ? 20 : 35;
        const timer = setTimeout(() => {
          setVisibleChars((c) => c + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else {
        setIsTyping(false);
        setMessages((prev) => [...prev, msg]);
        setVisibleChars(0);
        setCurrentMsg((c) => c + 1);
      }
    }, visibleChars === 0 ? 800 : 0);

    return () => clearTimeout(startDelay);
  }, [currentMsg, visibleChars]);

  const currentConvMsg = currentMsg < conversation.length ? conversation[currentMsg] : null;
  const typingText = currentConvMsg ? currentConvMsg.text.slice(0, visibleChars) : '';

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <div className="rounded-2xl border border-dark-border bg-dark-card/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-border bg-dark-card">
          <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center">
            <span className="text-neon text-xs font-bold font-heading">E</span>
          </div>
          <div>
            <span className="text-sm font-heading font-bold text-white">Eva AI</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3 min-h-[200px]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-white/10 text-white rounded-br-md'
                    : 'bg-neon/10 text-neon border border-neon/20 rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Currently typing message */}
          {currentConvMsg && visibleChars > 0 && (
            <div className={`flex ${currentConvMsg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  currentConvMsg.role === 'user'
                    ? 'bg-white/10 text-white rounded-br-md'
                    : 'bg-neon/10 text-neon border border-neon/20 rounded-bl-md'
                }`}
              >
                {typingText}
                <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse" />
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {isTyping && visibleChars === 0 && (
            <div className={`flex ${currentConvMsg?.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="bg-white/5 rounded-2xl px-4 py-3 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
