import { useState } from 'react';

const presetQuestions = [
  {
    q: 'How do I register a company in Delaware?',
    a: "To register a Delaware LLC:\n\n1. **Choose a unique name** — check availability at the DE Division of Corporations\n2. **Appoint a Registered Agent** — must have a physical DE address\n3. **File Certificate of Formation** — filing fee is $90\n4. **Create an Operating Agreement** — not filed but legally required\n5. **Get an EIN** from the IRS (free)\n\nTotal cost: ~$500-1,500 including agent fees. Processing: 2-3 weeks (standard) or same-day ($100 expedite).\n\nWant me to help you choose the best structure?",
  },
  {
    q: 'What are the tax benefits of an offshore company?',
    a: "Key tax benefits of offshore structures:\n\n• **0% Corporate Tax** — jurisdictions like BVI, Cayman Islands, Bahamas\n• **Tax Deferral** — defer home country taxes on foreign profits\n• **Treaty Benefits** — reduced withholding via tax treaties (e.g., Cyprus, Netherlands)\n• **No Capital Gains Tax** — many offshore jurisdictions\n• **Asset Protection** — legal separation from personal liability\n\n⚠️ Important: Always ensure compliance with CRS/FATCA reporting and your home country's CFC rules.\n\nShall I compare specific jurisdictions for your situation?",
  },
  {
    q: 'Compare Cyprus vs Estonia for an IT company',
    a: "**Cyprus vs Estonia for IT companies:**\n\n🇨🇾 **Cyprus:**\n• Corporate tax: 12.5%\n• IP Box regime: effective 2.5% on IP income\n• 60+ tax treaties\n• EU member — full access to EU market\n• No withholding on dividends to non-residents\n\n🇪🇪 **Estonia:**\n• 0% on retained profits (tax only on distribution: 20%)\n• e-Residency program — manage remotely\n• Digital-first government\n• EU member\n• Great for reinvesting profits\n\n**Verdict:** Estonia if you reinvest profits; Cyprus if you distribute dividends or have IP assets.",
  },
  {
    q: 'What documents do I need for UAE company formation?',
    a: "**UAE Company Formation — Required Documents:**\n\n📋 **For all shareholders/directors:**\n• Passport copies (notarized & apostilled)\n• Proof of address (utility bill, <3 months)\n• Bank reference letter\n• CV/Resume\n\n📋 **Company documents:**\n• Proposed company name (3 options)\n• Business plan / activity description\n• Initial share capital declaration\n• Memorandum of Association\n\n⏱️ **Timeline:** 3-5 working days (Free Zone) / 2-4 weeks (Mainland)\n💰 **Cost:** AED 15,000 - 50,000 depending on license type\n\nWant me to recommend the best Free Zone for your business type?",
  },
  {
    q: 'How does Eva protect my confidential data?',
    a: "**Eva's Security & Privacy Framework:**\n\n🔒 **Encryption:**\n• End-to-end encryption for all messages\n• AES-256 for data at rest\n• TLS 1.3 for data in transit\n\n🛡️ **Infrastructure:**\n• SOC 2 Type II compliant\n• GDPR compliant data processing\n• Hosted on enterprise-grade cloud (EU/US regions)\n\n📋 **Data Policies:**\n• No data sharing with third parties\n• Automatic data retention policies\n• Right to deletion — request anytime\n• No training on your private data\n\n✅ Your conversations and documents are processed securely and never used to train AI models.",
  },
];

export default function DemoChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'eva'; text: string }[]>([
    { role: 'eva', text: "Hi! I'm Eva, your AI business assistant. Ask me anything about company formation, tax optimization, or offshore structures. Try one of the questions below!" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleQuestion = (q: string, a: string) => {
    if (isTyping) return;

    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'eva', text: a }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl border border-dark-border bg-dark-card/90 backdrop-blur-xl overflow-hidden shadow-2xl">
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border bg-dark-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neon/20 flex items-center justify-center shadow-neon">
              <span className="text-neon text-sm font-bold font-heading">E</span>
            </div>
            <div>
              <span className="text-base font-heading font-bold text-white">Eva AI</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                <span className="text-xs text-gray-500">Online — Ready to help</span>
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-600 font-heading">DEMO</span>
        </div>

        {/* Messages */}
        <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-white/10 text-white rounded-br-md'
                    : 'bg-neon/10 text-[#b8ffb0] border border-neon/20 rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-neon/5 border border-neon/10 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-neon/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-neon/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-neon/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        {/* Preset questions */}
        <div className="border-t border-dark-border p-4">
          <p className="text-xs text-gray-600 mb-3 font-heading">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {presetQuestions.map((pq, i) => (
              <button
                key={i}
                onClick={() => handleQuestion(pq.q, pq.a)}
                disabled={isTyping}
                className="text-xs bg-dark border border-dark-border text-gray-400 hover:text-neon hover:border-neon/30 px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-left"
              >
                {pq.q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
