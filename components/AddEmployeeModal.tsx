import React from 'react';
import { Plus, X } from 'lucide-react';
import { FormData, GradeLevel } from '../types';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  onFormChange: (data: FormData) => void;
  countries: string[];
  gradeLevels: GradeLevel[];
  onSubmit: () => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  formData,
  onFormChange,
  countries,
  gradeLevels,
  onSubmit
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field: keyof FormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-50 flex items-center justify-center p-4">
        <div className="relative w-full bg-white/95 rounded-3xl max-w-lg overflow-y-auto h-full">
            <div className="backdrop-blur-lg rounded-3xl border border-white/20 p-8">
                <X className="absolute top-4 right-4 h-6 w-6 text-slate-600 cursor-pointer" onClick={onClose} />
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                        <Plus className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Add New Employee</h3>
                    <p className="text-slate-600 text-xs">Welcome a new team member to your organization</p>
                </div>
            
                <div className="space-y-6">
                    <input
                        type="text"
                        placeholder="Full Name *"
                        className="w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <select
                        className="w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                    >
                        <option value="">Select Country *</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="State / Province"
                        className="w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                    />
                    <textarea
                        placeholder="Address"
                        className="w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm resize-none"
                        rows={3}
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Job Role *"
                        className="w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Department *"
                        className="w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                    />
                    <select
                        className="w-full px-4 py-2 outline-none border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
                        value={formData.gradeLevel}
                        onChange={(e) => handleInputChange('gradeLevel', e.target.value)}
                    >
                        <option value="">Select Grade Level (Optional)</option>
                        {gradeLevels.map(gl => (
                            <option key={gl.id} value={gl.name}>{gl.name} - {gl.description}</option>
                        ))}
                    </select>
                </div>
            
                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-sm font-semibold text-slate-700 bg-slate-200 rounded-xl hover:bg-slate-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-6 py-3 cursor-pointer text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-lg"
                    >
                        Add Employee
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AddEmployeeModal;