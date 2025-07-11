'use client';

import React, { useState, useEffect } from 'react';
import { Employee, GradeLevel, FormData, GradeLevelForm } from '@/types';
import { 
  saveToLocalStorage, 
  loadFromLocalStorage, 
  fetchCountriesFromAPI, 
  getDefaultGradeLevels 
} from '@/utils/helpers';
import Header from '@/components/Header';
import SearchFilter from '@/components/SearchFilter';
import StatsCards from '@/components/StatsCards';
import LoadingScreen from '@/components/LoadingScreen';
import EmployeeTable from '@/components/EmployeeTable';
import AddEmployeeModal from '@/components/AddEmployeeModal';
import EditEmployeeModal from '@/components/EditEmployeeModal';
import GradeLevelModal from '@/components/GradeLevelModal';
import EmployeeProfileModal from '@/components/EmployeeProfileModal';

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [gradeLevels, setGradeLevels] = useState<GradeLevel[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showGradeLevelForm, setShowGradeLevelForm] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterGradeLevel, setFilterGradeLevel] = useState<string>('');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    country: '',
    state: '',
    address: '',
    role: '',
    department: '',
    gradeLevel: ''
  });

  const [gradeLevelForm, setGradeLevelForm] = useState<GradeLevelForm>({
    name: '',
    description: ''
  });

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async (): Promise<void> => {
    try {
      const { employees: savedEmployees, gradeLevels: savedGradeLevels } = loadFromLocalStorage();
      
      setEmployees(savedEmployees);
      
      if (savedGradeLevels) {
        setGradeLevels(savedGradeLevels);
      } else {
        const defaultGradeLevels = getDefaultGradeLevels();
        setGradeLevels(defaultGradeLevels);
        saveToLocalStorage(undefined, defaultGradeLevels);
      }

      const countriesList = await fetchCountriesFromAPI();
      setCountries(countriesList);
    } catch (error) {
      console.error('Error initializing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = (): void => {
    if (!formData.name || !formData.country || !formData.role || !formData.department) {
      alert('Please fill in all required fields');
      return;
    }

    const newEmployee: Employee = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    saveToLocalStorage(updatedEmployees, undefined);
    resetForm();
    setShowAddForm(false);
  };

  const editEmployee = (): void => {
    if (!formData.name || !formData.country || !formData.role || !formData.department) {
      alert('Please fill in all required fields');
      return;
    }

    if (!selectedEmployee) return;

    const updatedEmployees = employees.map(emp => 
      emp.id === selectedEmployee.id 
        ? { ...emp, ...formData, updatedAt: new Date().toISOString() }
        : emp
    );

    setEmployees(updatedEmployees);
    saveToLocalStorage(updatedEmployees, undefined);
    resetForm();
    setShowEditForm(false);
    setSelectedEmployee(null);
  };

  const deleteEmployee = (id: number): void => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      setEmployees(updatedEmployees);
      saveToLocalStorage(updatedEmployees, undefined);
    }
  };

  const openEditForm = (employee: Employee): void => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      country: employee.country,
      state: employee.state,
      address: employee.address,
      role: employee.role,
      department: employee.department,
      gradeLevel: employee.gradeLevel
    });
    setShowEditForm(true);
  };

  const openProfile = (employee: Employee): void => {
    setSelectedEmployee(employee);
    setShowProfile(true);
  };

  const addGradeLevel = (): void => {
    if (!gradeLevelForm.name) {
      alert('Please enter a grade level name');
      return;
    }

    const newGradeLevel: GradeLevel = {
      id: Date.now(),
      name: gradeLevelForm.name.toUpperCase(),
      description: gradeLevelForm.description || ''
    };

    const updatedGradeLevels = [...gradeLevels, newGradeLevel];
    setGradeLevels(updatedGradeLevels);
    saveToLocalStorage(undefined, updatedGradeLevels);
    setGradeLevelForm({ name: '', description: '' });
    setShowGradeLevelForm(false);
  };

  const deleteGradeLevel = (id: number): void => {
    if (window.confirm('Are you sure you want to delete this grade level?')) {
      const deletedGradeLevel = gradeLevels.find(gl => gl.id === id);
      const updatedGradeLevels = gradeLevels.filter(gl => gl.id !== id);
      setGradeLevels(updatedGradeLevels);
      saveToLocalStorage(undefined, updatedGradeLevels);
      
      const updatedEmployees = employees.map(emp => 
        emp.gradeLevel === deletedGradeLevel?.name 
          ? { ...emp, gradeLevel: '' }
          : emp
      );
      setEmployees(updatedEmployees);
      saveToLocalStorage(updatedEmployees, undefined);
    }
  };

  const resetForm = (): void => {
    setFormData({
      name: '',
      country: '',
      state: '',
      address: '',
      role: '',
      department: '',
      gradeLevel: ''
    });
  };

  const closeAddModal = (): void => {
    setShowAddForm(false);
    resetForm();
  };

  const closeEditModal = (): void => {
    setShowEditForm(false);
    resetForm();
    setSelectedEmployee(null);
  };

  const closeGradeLevelModal = (): void => {
    setShowGradeLevelForm(false);
    setGradeLevelForm({ name: '', description: '' });
  };

  const closeProfileModal = (): void => {
    setShowProfile(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGradeLevel = !filterGradeLevel || employee.gradeLevel === filterGradeLevel;
    
    return matchesSearch && matchesGradeLevel;
  });

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header 
        onAddEmployee={() => setShowAddForm(true)}
        onManageGradeLevels={() => setShowGradeLevelForm(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterGradeLevel={filterGradeLevel}
          onFilterChange={setFilterGradeLevel}
          gradeLevels={gradeLevels}
        />

        <StatsCards employees={employees} gradeLevels={gradeLevels} />

        <EmployeeTable
          employees={filteredEmployees}
          onViewProfile={openProfile}
          onEditEmployee={openEditForm}
          onDeleteEmployee={deleteEmployee}
        />
      </div>

      <AddEmployeeModal
        isOpen={showAddForm}
        onClose={closeAddModal}
        formData={formData}
        onFormChange={setFormData}
        countries={countries}
        gradeLevels={gradeLevels}
        onSubmit={addEmployee}
      />

      <EditEmployeeModal
        isOpen={showEditForm}
        onClose={closeEditModal}
        formData={formData}
        onFormChange={setFormData}
        countries={countries}
        gradeLevels={gradeLevels}
        onSubmit={editEmployee}
      />

      <GradeLevelModal
        isOpen={showGradeLevelForm}
        onClose={closeGradeLevelModal}
        gradeLevels={gradeLevels}
        gradeLevelForm={gradeLevelForm}
        onFormChange={setGradeLevelForm}
        onAddGradeLevel={addGradeLevel}
        onDeleteGradeLevel={deleteGradeLevel}
      />

      <EmployeeProfileModal
        isOpen={showProfile}
        onClose={closeProfileModal}
        employee={selectedEmployee}
        onEdit={openEditForm}
      />
    </div>
  );
}