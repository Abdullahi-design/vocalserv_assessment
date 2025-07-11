import React from 'react';
import { Users, User, Edit, Trash2 } from 'lucide-react';
import { Employee } from '../types';
import { getAvatarColor } from '../utils/helpers';

interface EmployeeTableProps {
  employees: Employee[];
  onViewProfile: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onViewProfile,
  onEditEmployee,
  onDeleteEmployee
}) => {
  if (employees.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden border border-white/20">
        <div className="px-8 py-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-blue-50/50">
          <h3 className="text-sm font-bold text-slate-900">
            Team Members (0)
          </h3>
        </div>
        <div className="text-center py-20">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6">
            <Users className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-md font-semibold text-slate-900 mb-2">No employees found</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Get started by adding your first team member to build your organization.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden border border-white/20">
      <div className="px-8 py-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-blue-50/50">
        <h3 className="text-sm font-bold text-slate-900">
          Team Members ({employees.length})
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50/50 to-blue-50/50">
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Role & Department
              </th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Location
              </th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Grade Level
              </th>
              <th className="px-8 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 group">
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 relative">
                      <div className={`h-12 w-12 rounded-full ${getAvatarColor(employee.name)} flex items-center justify-center shadow-lg ring-4 ring-white/50 group-hover:scale-110 transition-transform duration-200`}>
                        <span className="text-lg font-bold text-white">
                          {employee.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <div className="text-lg font-semibold text-slate-900">{employee.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="text-base text-slate-900 font-medium">{employee.role}</div>
                  <div className="text-sm text-slate-600">{employee.department}</div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="text-base text-slate-900">{employee.country}</div>
                  <div className="text-sm text-slate-600">{employee.state}</div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${
                    employee.gradeLevel 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg' 
                      : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700'
                  }`}>
                    {employee.gradeLevel || 'Not Assigned'}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onViewProfile(employee)}
                      className="group p-2 cursor-pointer text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all duration-200"
                      title="View Profile"
                    >
                      <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={() => onEditEmployee(employee)}
                      className="group p-2 cursor-pointer text-emerald-600 hover:text-emerald-900 hover:bg-emerald-100 rounded-lg transition-all duration-200"
                      title="Edit Employee"
                    >
                      <Edit className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={() => onDeleteEmployee(employee.id)}
                      className="group p-2 cursor-pointer text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all duration-200"
                      title="Delete Employee"
                    >
                      <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;