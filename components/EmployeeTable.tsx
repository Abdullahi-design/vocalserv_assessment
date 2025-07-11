import { Users, MapPin, Building, Award } from 'lucide-react';
import { Employee } from '../types';
import { getAvatarColor } from '../utils/helpers';
import { ActionMenu } from './ActionMenu';

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
      <div className="px-4 sm:px-8 py-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-blue-50/50">
        <h3 className="text-sm font-bold text-slate-900">
          Team Members ({employees.length})
        </h3>
      </div>
      
      <div className="hidden lg:block overflow-x-auto">
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
                  <ActionMenu
                    employee={employee}
                    onViewProfile={onViewProfile}
                    onEditEmployee={onEditEmployee}
                    onDeleteEmployee={onDeleteEmployee}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden divide-y divide-slate-200/50">
        {employees.map((employee) => (
          <div key={employee.id} className="p-4 sm:p-6 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 relative">
                <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full ${getAvatarColor(employee.name)} flex items-center justify-center shadow-lg ring-2 ring-white/50`}>
                  <span className="text-lg sm:text-xl font-bold text-white">
                    {employee.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-slate-900 truncate">{employee.name}</h4>
                <p className="text-sm text-slate-600 truncate">{employee.role}</p>
              </div>
              <div className="ml-2">
                <ActionMenu
                  employee={employee}
                  onViewProfile={onViewProfile}
                  onEditEmployee={onEditEmployee}
                  onDeleteEmployee={onDeleteEmployee}
                  isMobile={true}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                  <Building className="h-4 w-4 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Department</p>
                  <p className="text-sm font-medium text-slate-900 truncate">{employee.department}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-2 bg-emerald-100 rounded-lg">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Location</p>
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {employee.country}
                    {employee.state && `, ${employee.state}`}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:col-span-2">
                <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Grade Level</p>
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full mt-1 ${
                    employee.gradeLevel 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm' 
                      : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700'
                  }`}>
                    {employee.gradeLevel || 'Not Assigned'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;