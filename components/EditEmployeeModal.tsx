import React from 'react';
import { Edit } from 'lucide-react';
import { FormData, GradeLevel } from '../types';

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  onFormChange: (data: FormData) => void;
  countries: string[];
  gradeLevels: GradeLevel[];
  onSubmit: () => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg">
        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4">
              <Edit className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Edit Employee</h3>
            <p className="text-slate-600">Update employee information</p>
          </div>
          
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Full Name *"
              className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <select
              className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
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
              className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
            />
            <textarea
              placeholder="Address"
              className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm resize-none"
              rows={3}
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
            <input
              type="text"
              placeholder="Job Role *"
              className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
            />
            <input
              type="text"
              placeholder="Department *"
              className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
            />
            <select
              className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm"
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
              className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl hover:from-emerald-700 hover:to-green-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Update Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;