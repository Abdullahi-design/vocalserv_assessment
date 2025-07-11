import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <div className="absolute inset-0 rounded-full bg-blue-100 blur-xl opacity-30 animate-pulse"></div>
        </div>
        <p className="text-slate-600 font-medium">Loading Staff Directory...</p>
        <p className="text-slate-400 text-sm mt-1">Preparing your workspace</p>
      </div>
    </div>
  );
};

export default LoadingScreen;