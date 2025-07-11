import React from 'react';
import { Users, Building, Award } from 'lucide-react';
import { Employee, GradeLevel } from '../types';

interface StatsCardsProps {
  employees: Employee[];
  gradeLevels: GradeLevel[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ employees, gradeLevels }) => {
  const departmentCount = [...new Set(employees.map(emp => emp.department))].length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="group bg-white/60 backdrop-blur-lg p-4 h-fit rounded-3xl shadow-lg border border-white/20 hover:shadow-xl hover:bg-white/70 transition-all duration-300">
            <div className="flex items-center">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-5 w-5 text-white" />
                </div>
                <div className="ml-6">
                    <p className="md:text-sm text-xs font-semibold text-slate-600 uppercase tracking-wide">Total Employees</p>
                    <p className="md:text-xl text-lg font-bold text-slate-900">{employees.length}</p>
                </div>
            </div>
        </div>
      
        <div className="group bg-white/60 backdrop-blur-lg p-4 h-fit rounded-3xl shadow-lg border border-white/20 hover:shadow-xl hover:bg-white/70 transition-all duration-300">
            <div className="flex items-center">
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Building className="h-5 w-5 text-white" />
                </div>
                <div className="ml-6">
                    <p className="md:text-sm text-xs font-semibold text-slate-600 uppercase tracking-wide">Departments</p>
                    <p className="md:text-xl text-lg font-bold text-slate-900">{departmentCount}</p>
                </div>
            </div>
        </div>

        <div className="group bg-white/60 backdrop-blur-lg p-4 h-fit rounded-3xl shadow-lg border border-white/20 hover:shadow-xl hover:bg-white/70 transition-all duration-300">
            <div className="flex items-center">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-5 w-5 text-white" />
                </div>
                <div className="ml-6">
                    <p className="md:text-sm text-xs font-semibold text-slate-600 uppercase tracking-wide">Grade Levels</p>
                    <p className="md:text-xl text-lg font-bold text-slate-900">{gradeLevels.length}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default StatsCards;