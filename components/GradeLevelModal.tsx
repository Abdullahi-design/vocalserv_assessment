import React from 'react';
import { Award, Trash2, X } from 'lucide-react';
import { GradeLevel, GradeLevelForm } from '../types';

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
  if (!isOpen) return null;

  const handleInputChange = (field: keyof GradeLevelForm, value: string) => {
    onFormChange({ ...gradeLevelForm, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-50 flex items-center justify-center p-4">
        <div className="relative w-full bg-white/95 rounded-3xl max-w-lg overflow-y-auto h-full">
            <div className="backdrop-blur-lg rounded-3xl border border-white/20 p-8">
                <X className="absolute top-4 right-4 h-6 w-6 text-slate-600 cursor-pointer" onClick={onClose} />
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                        <Award className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Manage Grade Levels</h3>
                    <p className="text-slate-600 text-xs">Create and organize employee grade levels</p>
                </div>
            
                <div className="space-y-6 mb-8 p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-200/50">
                    <h4 className="text-sm font-semibold text-slate-900 mb-4">Add New Grade Level</h4>
                    <input
                        type="text"
                        placeholder="Grade Level Name (e.g., LVL6) *"
                        className="w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm"
                        value={gradeLevelForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description (Optional)"
                        className="w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/80 backdrop-blur-sm"
                        value={gradeLevelForm.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <button
                        onClick={onAddGradeLevel}
                        className="w-full px-6 py-2 cursor-pointer text-xs outline-none font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg"
                    >
                        Add Grade Level
                    </button>
                </div>

                <div className="border-t border-slate-200 pt-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">Existing Grade Levels</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {gradeLevels.map(gl => (
                            <div key={gl.id} className="group flex items-center justify-between p-4 bg-gradient-to-r from-slate-50/80 to-blue-50/80 rounded-xl border border-slate-200/50 hover:from-blue-50/80 hover:to-indigo-50/80 transition-all">
                                <div>
                                    <span className="font-semibold text-slate-900">{gl.name}</span>
                                    {gl.description && <span className="text-sm text-slate-600 ml-2">- {gl.description}</span>}
                                </div>
                                <button
                                    onClick={() => onDeleteGradeLevel(gl.id)}
                                    className="opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all duration-200"
                                    title="Delete Grade Level"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 cursor-pointer text-sm font-semibold text-slate-700 bg-slate-200 rounded-xl hover:bg-slate-300 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default GradeLevelModal;