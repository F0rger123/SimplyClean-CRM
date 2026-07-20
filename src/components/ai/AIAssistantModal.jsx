import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Sparkles, Send, ArrowRight } from 'lucide-react';

export const AIAssistantModal = () => {
  const { isAIOpen, setIsAIOpen, jobs, invoices, showToast } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'ai', text: 'Hello Sarah! I am SimplyClean AI. How can I help optimize your cleaning operations today?' }
  ]);

  if (!isAIOpen) return null;

  const handleSendQuery = (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    // Append user message
    const userMsg = { sender: 'user', text: textToSend };
    setChatLog(prev => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent response based on query
    setTimeout(() => {
      let responseText = "I've analyzed your SimplyClean workspace data.";

      if (textToSend.toLowerCase().includes('schedule') || textToSend.toLowerCase().includes('today')) {
        responseText = `You have 3 jobs scheduled for today (July 20). 1 is marked Completed (Miller residence), 1 is In Progress (Emily Watson), and 1 is Scheduled for 6:00 PM (Apex Design Studio). Overall dispatch health is optimal!`;
      } else if (textToSend.toLowerCase().includes('unpaid') || textToSend.toLowerCase().includes('invoice')) {
        const overdue = invoices.filter(i => i.status === 'overdue');
        responseText = `Found ${overdue.length} overdue invoice: INV-2026-003 for Apex Design Studio ($595.38 total). Would you like me to trigger an automated Twilio SMS reminder?`;
      } else if (textToSend.toLowerCase().includes('quote') || textToSend.toLowerCase().includes('estimate')) {
        responseText = `For a 3,000 sqft office space, the recommended SimplyClean commercial rate is $350.00/visit for weekly service. I can draft a quote link to send directly to your lead!`;
      } else {
        responseText = `All SimplyClean integrations (Stripe, QuickBooks, Twilio, Google Maps) are active and running with zero errors. Your average ticket size is $235.00!`;
      }

      setChatLog(prev => [...prev, { sender: 'ai', text: responseText }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-purple-300 shadow-soft-lg relative flex flex-col h-[520px] justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white flex items-center justify-center shadow-soft">
              <Bot className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-obsidian-900 flex items-center gap-1.5">
                <span>SimplyClean AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-[10px] text-purple-700 font-semibold">CRM Operational Assistant</div>
            </div>
          </div>

          <button
            onClick={() => setIsAIOpen(false)}
            className="text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
            ×
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 my-4 overflow-y-auto space-y-3 pr-1 text-xs">
          {chatLog.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl ${
                item.sender === 'ai'
                  ? 'bg-purple-50 text-purple-950 border border-purple-200'
                  : 'bg-obsidian-900 text-white ml-auto max-w-[85%] shadow-soft'
              }`}>
              {item.text}
            </div>
          ))}
        </div>

        {/* Prompt Suggestion Chips */}
        <div className="space-y-2 mb-3">
          <div className="text-[10px] font-bold text-obsidian-400 uppercase tracking-wider">Suggested Quick Actions</div>
          <div className="flex flex-wrap gap-1.5">
            {[
              "Summarize today's schedule",
              "Find unpaid invoices",
              "Estimate 3,000 sqft quote"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuery(chip)}
                className="px-3 py-1.5 bg-purple-100/70 hover:bg-purple-200 text-purple-900 font-semibold rounded-xl text-[11px] transition-colors">
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSendQuery(); }}
          className="flex items-center gap-2 pt-3 border-t border-purple-100">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask SimplyClean AI anything..."
            className="flex-1 px-4 py-3 bg-purple-50/50 border border-purple-200 rounded-2xl text-xs outline-none focus:border-purple-600"
          />
          <button
            type="submit"
            className="p-3 bg-obsidian-900 hover:bg-obsidian-800 text-yellow-300 rounded-2xl shadow-soft">
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
