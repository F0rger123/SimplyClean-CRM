import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Send,
  Sparkles,
  Phone,
  Paperclip,
  Check
} from 'lucide-react';

export const ContractorChat = () => {
  const { activeContractor, showToast } = useApp();

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'dispatch', text: 'Good morning Elena! You have 3 jobs assigned on the South Austin route today.', time: '08:00 AM' },
    { id: 2, sender: 'cleaner', text: 'Received! Heading to 4810 Shoal Creek first.', time: '08:15 AM' },
    { id: 3, sender: 'dispatch', text: 'Great. Note that the client requested extra attention on the master bath glass.', time: '08:18 AM' },
    { id: 4, sender: 'cleaner', text: 'All before and after photos uploaded for Shoal Creek. Completed!', time: '11:28 AM' },
    { id: 5, sender: 'dispatch', text: 'Looks immaculate! Invoiced automatically.', time: '11:30 AM' }
  ]);

  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'cleaner',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'dispatch',
          text: 'Dispatch received your message! We are on it.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-3xl border border-purple-200 shadow-soft flex flex-col h-[560px] justify-between overflow-hidden animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="p-4 bg-purple-50/80 border-b border-purple-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-obsidian-900 text-yellow-300 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-obsidian-900">SimplyClean Live Dispatch</div>
            <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sarah Chen (Owner) is Online</span>
            </div>
          </div>
        </div>

        <a
          href="tel:5128839201"
          className="p-2.5 bg-white hover:bg-purple-100 rounded-xl text-purple-700 transition-colors border border-purple-200 flex items-center gap-1 text-xs font-bold">
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Call Office</span>
        </a>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-5 overflow-y-auto space-y-3 text-xs">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === 'cleaner' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}>
            <div className={`p-3.5 rounded-2xl ${
              msg.sender === 'cleaner'
                ? 'bg-obsidian-900 text-white rounded-br-none shadow-soft border border-purple-300/30'
                : 'bg-purple-100 text-purple-950 rounded-bl-none border border-purple-200 font-medium'
            }`}>
              {msg.text}
            </div>
            <span className="text-[10px] text-obsidian-400 mt-1 px-1">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Input Composer */}
      <form onSubmit={handleSend} className="p-4 bg-purple-50/40 border-t border-purple-100 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Message dispatch (need supplies, reporting gate delay)..."
          className="flex-1 px-4 py-3 bg-white border border-purple-200 rounded-2xl text-xs outline-none focus:border-purple-600 shadow-sm"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-obsidian-900 hover:bg-obsidian-800 text-yellow-300 font-bold rounded-2xl shadow-soft text-xs flex items-center gap-1.5 border border-purple-300/40">
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </form>

    </div>
  );
};
