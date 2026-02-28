import { useState } from 'react';

const quickReplies = [
  { q: 'Tell me about Eva', a: "I'm Eva, an AI assistant built for tax consultants, lawyers, and business advisors. I can help with company formation, tax optimization across 300+ jurisdictions, document analysis, and more!" },
  { q: 'How to get started?', a: "Getting started is easy!\n\n1. Sign up for a free account\n2. Connect Eva to your website or messenger\n3. Upload your knowledge base\n\nOr just scroll up and try our interactive demo!" },
  { q: 'Contact sales', a: "You can reach our team:\n\n📱 Telegram: @innova_bot\n📱 WhatsApp: +380 67 777 7230\n📧 Email: bot@innova.bot\n\nWe'll get back to you within 1 hour!" },
];

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'eva'; text: string }[]>([
    { role: 'eva', text: "Hi! I'm Eva. How can I help you today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleReply = (q: string, a: string) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'eva', text: a }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {isOpen && (
        <div className="w-80 rounded-2xl border border-dark-border bg-dark-card shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border bg-dark-card">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center">
                <span className="text-neon text-xs font-bold font-heading">E</span>
              </div>
              <div>
                <span className="text-sm font-heading font-bold text-white">Eva AI</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                  <span className="text-[10px] text-gray-500">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="p-3 space-y-2.5 max-h-[250px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-white/10 text-white rounded-br-sm'
                      : 'bg-neon/10 text-[#b8ffb0] border border-neon/20 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-neon/5 border border-neon/10 rounded-xl rounded-bl-sm px-3 py-2 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neon/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neon/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          <div className="border-t border-dark-border p-3 space-y-2">
            {quickReplies.map((qr, i) => (
              <button
                key={i}
                onClick={() => handleReply(qr.q, qr.a)}
                disabled={isTyping}
                className="block w-full text-left text-xs bg-dark border border-dark-border text-gray-400 hover:text-neon hover:border-neon/30 px-3 py-2 rounded-lg transition-all disabled:opacity-50"
              >
                {qr.q}
              </button>
            ))}
          </div>

          {/* Contact links */}
          <div className="flex items-center justify-center gap-4 px-4 py-2 border-t border-dark-border bg-dark/50">
            <a href="https://t.me/+380677777230" target="_blank" rel="noopener noreferrer" className="text-electric hover:text-electric/80 transition-colors" title="Telegram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=380677777230" target="_blank" rel="noopener noreferrer" className="text-neon hover:text-neon/80 transition-colors" title="WhatsApp">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="mailto:bot@innova.bot" className="text-gray-500 hover:text-white transition-colors" title="Email">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-neon flex items-center justify-center shadow-neon-lg hover:shadow-[0_0_30px_rgba(57,255,20,0.8)] transition-all duration-300 animate-pulse-neon group"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
