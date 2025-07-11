import React from 'react';
import { X } from 'lucide-react';

interface VModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconGradient?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const VModal: React.FC<VModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  iconGradient,
  children,
  actions
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative w-full bg-white/95 rounded-3xl max-w-lg overflow-y-auto h-full">
        <div className="backdrop-blur-lg rounded-3xl border border-white/20 p-8">
          <X 
            className="absolute top-4 right-4 h-6 w-6 text-slate-600 cursor-pointer hover:text-slate-800 transition-colors" 
            onClick={onClose} 
          />
          
          <div className="text-center mb-8">
            <div className={`mx-auto w-12 h-12 bg-gradient-to-br ${iconGradient} rounded-2xl flex items-center justify-center mb-4`}>
              {icon}
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">{title}</h3>
            {subtitle && <p className="text-slate-600 text-xs">{subtitle}</p>}
          </div>
          
          <div className="space-y-6">
            {children}
          </div>
          
          {actions && (
            <div className="flex justify-end space-x-4 mt-8">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};