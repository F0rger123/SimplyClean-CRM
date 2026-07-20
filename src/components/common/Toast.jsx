import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toastNotification } = useApp();

  if (!toastNotification) return null;

  const { message, type } = toastNotification;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-obsidian-900 text-white rounded-2xl shadow-soft-lg border border-purple-300/30 text-sm font-medium">
        {type === 'success' && <CheckCircle2 className="w-5 h-5 text-yellow-300 shrink-0" />}
        {type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {type === 'info' && <Info className="w-5 h-5 text-purple-300 shrink-0" />}
        <span className="tracking-tight">{message}</span>
      </div>
    </div>
  );
};
