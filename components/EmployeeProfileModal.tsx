import React from 'react';
import { Star, Building, MapPin, Award, Calendar, Edit, X } from 'lucide-react';
import { Employee } from '../types';
import { getAvatarColor } from '../utils/helpers';
import { VButton } from './ui/VButton';

interface EmployeeProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
    onEdit: (employee: Employee) => void;
}

const EmployeeProfileModal: React.FC<EmployeeProfileModalProps> = ({
    isOpen,
    onClose,
    employee,
    onEdit
}) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative w-full bg-white/95 rounded-3xl max-w-lg overflow-y-auto h-full">
        <div className="backdrop-blur-lg rounded-3xl border border-white/20 p-8">
          <X 
            className="absolute top-4 right-4 h-6 w-6 text-slate-600 cursor-pointer hover:text-slate-800 transition-colors" 
            onClick={onClose} 
          />
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className={`h-18 w-18 rounded-full ${getAvatarColor(employee.name)} flex items-center justify-center shadow-xl ring-4 ring-white/50`}>
                  <span className="text-2xl font-bold text-white">
                    {employee.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{employee.name}</h3>
            <p className="text-sm text-slate-600 font-medium">{employee.role}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start p-2 h-fit bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-200/50">
              <Building className="h-6 w-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Department</p>
                <p className="text-lg text-slate-700 font-medium">{employee.department}</p>
              </div>
            </div>

            <div className="flex items-start p-2 h-fit bg-gradient-to-r from-emerald-50/50 to-green-50/50 rounded-xl border border-emerald-200/50">
              <MapPin className="h-6 w-6 text-emerald-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Location</p>
                <p className="text-lg text-slate-700 font-medium">
                  {employee.country}
                  {employee.state && `, ${employee.state}`}
                </p>
                {employee.address && (
                  <p className="text-sm text-slate-600 mt-1">{employee.address}</p>
                )}
              </div>
            </div>

            <div className="flex items-start p-2 h-fit bg-gradient-to-r from-purple-50/50 to-indigo-50/50 rounded-xl border border-purple-200/50">
              <Award className="h-6 w-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Grade Level</p>
                <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full mt-2 ${
                  employee.gradeLevel 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg' 
                    : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700'
                }`}>
                  {employee.gradeLevel || 'Not Assigned'}
                </span>
              </div>
            </div>

            {employee.createdAt && (
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center text-sm text-slate-500 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Added {new Date(employee.createdAt).toLocaleDateString()}</span>
                  </div>
                  {employee.updatedAt && (
                    <div className="flex items-center">
                      <Edit className="h-4 w-4 mr-2" />
                      <span>Updated {new Date(employee.updatedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <VButton
              variant="primary"
              onClick={() => {
                onClose();
                onEdit(employee);
              }}
            >
              Edit Employee
            </VButton>
            <VButton variant="secondary" onClick={onClose}>
              Close
            </VButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileModal;