import React from 'react';
import { Award, Trash2 } from 'lucide-react';
import { GradeLevel, GradeLevelForm } from '../types';
import { VButton } from './ui/VButton';
import { VModal } from './ui/VModal';
import { VInput } from './ui/VInput';

interface GradeLevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  gradeLevels: GradeLevel[];
  gradeLevelForm: GradeLevelForm;
  onFormChange: (data: GradeLevelForm) => void;
  onAddGradeLevel: () => void;
  onDeleteGradeLevel: (id: number) => void;
}

const GradeLevelModal: React.FC<GradeLevelModalProps> = ({
  isOpen,
  onClose,
  gradeLevels,
  gradeLevelForm,
  onFormChange,
  onAddGradeLevel,
  onDeleteGradeLevel
}) => {
  const handleInputChange = (field: keyof GradeLevelForm, value: string) => {
    onFormChange({ ...gradeLevelForm, [field]: value });
  };

  const modalIcon = (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-600">
      <Award className="h-5 w-5 text-white" />
    </div>
  );

  const modalActions = (
    <VButton variant="secondary" onClick={onClose}>
      Close
    </VButton>
  );

  return (
    <VModal
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Grade Levels"
      subtitle="Create and organize employee grade levels"
      icon={modalIcon}
        iconGradient="from-purple-500 to-indigo-600"
      actions={modalActions}
    >
      {/* Add New Grade Level Section */}
      <div className="space-y-6 mb-8 p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-200/50">
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Add New Grade Level</h4>
        
        <VInput
          placeholder="Grade Level Name (e.g., LVL6) *"
          value={gradeLevelForm.name}
          onChange={(value) => handleInputChange('name', value)}
          className="bg-white/80"
        />
        
        <VInput
          placeholder="Description (Optional)"
          value={gradeLevelForm.description}
          onChange={(value) => handleInputChange('description', value)}
          className="bg-white/80"
        />
        
        <VButton 
          variant="success" 
          onClick={onAddGradeLevel}
          size="sm"
          className="w-full"
        >
          Add Grade Level
        </VButton>
      </div>

      {/* Existing Grade Levels Section */}
      <div className="border-t border-slate-200 pt-6">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">Existing Grade Levels</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {gradeLevels.map(gl => (
            <div 
              key={gl.id} 
              className="group flex items-center justify-between p-4 bg-gradient-to-r from-slate-50/80 to-blue-50/80 rounded-xl border border-slate-200/50 hover:from-blue-50/80 hover:to-indigo-50/80 transition-all"
            >
              <div>
                <span className="font-semibold text-slate-900">{gl.name}</span>
                {gl.description && (
                  <span className="text-sm text-slate-600 ml-2">- {gl.description}</span>
                )}
              </div>
              <button
                onClick={() => onDeleteGradeLevel(gl.id)}
                className="opacity-0 cursor-pointer group-hover:opacity-100 p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all duration-200"
                title="Delete Grade Level"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </VModal>
  );
};

export default GradeLevelModal;