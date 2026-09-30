import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div 
      id="toast-notifications-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all transform animate-slideIn ${
            toast.type === 'success'
              ? 'bg-[#2E1A0F] text-[#FAF7F2] border-[#5A3822]'
              : toast.type === 'error'
              ? 'bg-[#4A1616] text-[#FAF7F2] border-[#7F2626]'
              : 'bg-[#1C2C24] text-[#FAF7F2] border-[#2C483A]'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-[#88B093] shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#E6C9A8] shrink-0" />}
            <span className="text-sm font-medium leading-snug">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-3 text-[#A89485] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
