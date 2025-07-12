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
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const VModal: React.FC<VModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  iconGradient,
  children,
  actions,
  size = 'lg'
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-lg',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl'
  };

  const isLargeModal = size === 'xl' || size === '2xl';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-50 flex items-center justify-center p-4">
      <div className={`relative w-full bg-white/95 rounded-3xl ${sizeClasses[size]} overflow-y-auto ${isLargeModal ? 'max-h-[90vh]' : 'max-h-[90vh]'}`}>
        <div className="backdrop-blur-lg rounded-3xl border border-white/20 p-6 sm:p-8">
          <X 
            className="absolute top-4 right-4 h-6 w-6 text-slate-600 cursor-pointer hover:text-slate-800 transition-colors z-10"
            onClick={onClose}
          />
          
          <div className="mb-8">
            {isLargeModal ? (
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${iconGradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  {icon}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-slate-600 text-base leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 mb-6 bg-gradient-to-br ${iconGradient} rounded-2xl flex items-center justify-center`}>
                  {icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-slate-600 text-base leading-relaxed max-w-md mx-auto">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className={isLargeModal ? '' : 'space-y-6'}>
            {children}
          </div>
          
          {actions && (
            <div className={`flex justify-end space-x-4 ${isLargeModal ? 'mt-6 pt-6 border-t border-slate-200' : 'mt-8'}`}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};