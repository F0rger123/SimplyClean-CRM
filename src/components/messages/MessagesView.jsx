import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Send,
  Phone,
  Mail,
  User,
  Sparkles,
  Search,
  Check
} from 'lucide-react';

export const MessagesView = () => {
  const { messages, sendTwilioSMS } = useApp();

  const [activeMessage, setActiveMessage] = useState(messages[0] || null);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText || !activeMessage) return;

    const newHistoryItem = {
      sender: 'system',
      text: replyText,
      time: 'Just now'
    };

    activeMessage.history.push(newHistoryItem);
    activeMessage.lastMessage = replyText;
    activeMessage.timestamp = 'Just now';

    setReplyText('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-obsidian-900 tracking-tight">
          Multi-Channel Communication Inbox
        </h1>
        <p className="text-obsidian-500 text-xs mt-1 font-medium">
          Unified SMS and email messages with clients and cleaner staff.
        </p>
      </div>

      {/* Inbox Split View */}
      <div className="bg-white rounded-3xl border border-purple-200 shadow-soft overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
        
        {/* Left Conversation List */}
        <div className="md:col-span-5 border-r border-purple-100 p-4 space-y-3 bg-purple-50/30">
          <div className="font-bold text-xs text-obsidian-500 uppercase tracking-wider px-2">Conversations ({messages.length})</div>
          
          <div className="space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setActiveMessage(msg)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                  activeMessage?.id === msg.id
                    ? 'bg-obsidian-900 text-white border-purple-300 shadow-soft'
                    : 'bg-white text-obsidian-800 border-purple-200 hover:border-purple-300'
                }`}>
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <img src={msg.avatar} alt={msg.clientName} className="w-7 h-7 rounded-full object-cover" />
                    <span className="font-bold text-xs">{msg.clientName}</span>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full ${
                    activeMessage?.id === msg.id ? 'bg-yellow-300 text-obsidian-950' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {msg.channel}
                  </span>
                </div>

                <p className={`text-xs truncate ${activeMessage?.id === msg.id ? 'text-purple-200' : 'text-obsidian-600'}`}>
                  {msg.lastMessage}
                </p>

                <div className={`text-[10px] text-right ${activeMessage?.id === msg.id ? 'text-obsidian-400' : 'text-obsidian-400'}`}>
                  {msg.timestamp}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Active Thread View */}
        <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
          {activeMessage ? (
            <>
              {/* Thread Header */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-100">
                <div className="flex items-center gap-3">
                  <img src={activeMessage.avatar} alt={activeMessage.clientName} className="w-10 h-10 rounded-2xl object-cover border border-purple-200" />
                  <div>
                    <h3 className="font-bold text-sm text-obsidian-900">{activeMessage.clientName}</h3>
                    <div className="text-xs text-purple-700 font-semibold">{activeMessage.channel} Thread</div>
                  </div>
                </div>
              </div>

              {/* Chat Bubble History */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-80 pr-2">
                {activeMessage.history?.map((h, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col text-xs max-w-[80%] ${
                      h.sender === 'system' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}>
                    <div className={`p-3.5 rounded-2xl ${
                      h.sender === 'system'
                        ? 'bg-obsidian-900 text-white rounded-br-none shadow-soft border border-purple-300/30'
                        : 'bg-purple-100 text-purple-950 rounded-bl-none border border-purple-200'
                    }`}>
                      {h.text}
                    </div>
                    <span className="text-[10px] text-obsidian-400 mt-1 px-1">{h.time}</span>
                  </div>
                ))}
              </div>

              {/* Reply Input Box */}
              <form onSubmit={handleSendReply} className="pt-3 border-t border-purple-100 flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply via ${activeMessage.channel}...`}
                  className="flex-1 px-4 py-3 bg-purple-50/50 border border-purple-200 rounded-2xl text-xs outline-none focus:border-purple-600"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-xs flex items-center gap-1.5 border border-purple-300/40">
                  <Send className="w-4 h-4 text-yellow-300" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-20 text-obsidian-400 text-xs">Select a conversation thread</div>
          )}
        </div>

      </div>

    </div>
  );
};
