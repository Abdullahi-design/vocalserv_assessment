import React from 'react';
import { Plus, Upload } from 'lucide-react';

interface ModeToggleProps {
  mode: 'single' | 'batch';
  onModeChange: (mode: 'single' | 'batch') => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onModeChange }) => (
    <div className="flex space-x-4 mb-6">
        <button
            onClick={() => onModeChange('single')}
            className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                mode === 'single'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
        >
            <Plus className="h-4 w-4 inline mr-2" />
            Single Employee
        </button>
        <button
            onClick={() => onModeChange('batch')}
            className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                mode === 'batch'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
        >
            <Upload className="h-4 w-4 inline mr-2" />
            Batch Upload
        </button>
    </div>
);