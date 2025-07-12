import React from 'react';
import { Building, MapPin, Award } from 'lucide-react';
import { getAvatarColor } from '../../utils/helpers';

interface ParsedEmployee {
    name: string;
    country: string;
    state: string;
    address: string;
    role: string;
    department: string;
    gradeLevel: string;
    isValid: boolean;
    errors: string[];
}

interface EmployeePreviewTableProps {
    employees: ParsedEmployee[];
}

export const EmployeePreviewTable: React.FC<EmployeePreviewTableProps> = ({ employees }) => {
    const validCount = employees.filter(emp => emp.isValid).length;
    const invalidCount = employees.filter(emp => !emp.isValid).length;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b">
            <h4 className="font-medium text-gray-900">
                Employee Preview ({validCount} valid, {invalidCount} invalid)
            </h4>
        </div>

        <div className="hidden lg:block max-h-96 overflow-y-auto">
            <table className="min-w-full">
                <thead className="bg-gray-50 sticky top-0">
                    <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {employees.map((employee, index) => (
                        <tr key={index} className={employee.isValid ? 'bg-white' : 'bg-red-50'}>
                            <td className="px-3 py-2">
                                {employee.isValid ? (
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                        Valid
                                    </span>
                                ) : (
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                        Invalid
                                    </span>
                                )}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-900">{employee.name}</td>
                            <td className="px-3 py-2 text-sm text-gray-600">{employee.role}</td>
                            <td className="px-3 py-2 text-sm text-gray-600">{employee.department}</td>
                            <td className="px-3 py-2 text-sm text-gray-600">{employee.country}</td>
                            <td className="px-3 py-2 text-sm text-gray-600">{employee.gradeLevel || 'Not Assigned'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="lg:hidden max-h-96 overflow-y-auto divide-y divide-gray-200">
            {employees.map((employee, index) => (
                <div key={index} className={`p-4 ${employee.isValid ? 'bg-white' : 'bg-red-50'}`}>
                    <div className="flex items-center mb-3">
                        <div className={`h-10 w-10 rounded-full ${getAvatarColor(employee.name)} flex items-center justify-center mr-3`}>
                            <span className="text-sm font-bold text-white">
                                {employee.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{employee.name}</h4>
                            <p className="text-sm text-gray-600">{employee.role}</p>
                        </div>
                        {employee.isValid ? (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Valid
                            </span>
                        ) : (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            Invalid
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center">
                            <Building className="h-3 w-3 text-gray-400 mr-2" />
                            <span className="text-gray-600">{employee.department}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="h-3 w-3 text-gray-400 mr-2" />
                            <span className="text-gray-600">{employee.country}</span>
                        </div>
                        <div className="flex items-center col-span-2">
                            <Award className="h-3 w-3 text-gray-400 mr-2" />
                            <span className="text-gray-600">{employee.gradeLevel || 'Not Assigned'}</span>
                        </div>
                    </div>

                    {!employee.isValid && employee.errors.length > 0 && (
                        <div className="mt-3 p-2 bg-red-100 rounded-lg">
                            <p className="text-xs text-red-600 font-medium">Errors:</p>
                            <ul className="text-xs text-red-600 list-disc list-inside">
                                {employee.errors.map((error, errorIndex) => (
                                    <li key={errorIndex}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
};