import React from 'react';
import { Users, Award, Plus } from 'lucide-react';

interface HeaderProps {
  onAddEmployee: () => void;
  onManageGradeLevels: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddEmployee, onManageGradeLevels }) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-2">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                        <Users className="h-3 w-3 text-white" />
                    </div>
                    <div className='md:block hidden'>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                            Staff Directory
                        </h1>
                        <p className="mt-2 text-slate-600 font-medium text-sm">Manage your organization's talent</p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={onManageGradeLevels}
                        className="group inline-flex items-center px-2 py-2 cursor-pointer border border-slate-200 rounded-xl shadow-sm text-sm font-semibold text-slate-700 bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200"
                    >
                        <Award className="h-4 w-4 mr-2 group-hover:text-indigo-600 transition-colors" />
                        <p className='text-xs'>Manage Levels</p>
                    </button>
                    <button
                        onClick={onAddEmployee}
                        className="group inline-flex items-center px-2 py-2 cursor-pointer border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                    >
                        <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                        <p className='text-xs'>Add Employee</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Header;