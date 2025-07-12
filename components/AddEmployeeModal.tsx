import React, { useState, useRef } from 'react';
import { Plus, Users } from 'lucide-react';
import { FormData, GradeLevel, Employee } from '../types';
import { VButton } from './ui/VButton';
import { VModal } from './ui/VModal';
import { ModeToggle } from './AddEmployeeModal/ModeToggle';
import { SingleEmployeeForm } from './AddEmployeeModal/SingleEmployeeForm';
import { BatchUploadForm } from './AddEmployeeModal/BatchUploadForm';

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

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  onFormChange: (data: FormData) => void;
  countries: string[];
  gradeLevels: GradeLevel[];
  onSubmit: () => void;
  onBatchSubmit?: (employees: Omit<Employee, 'id' | 'createdAt'>[]) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  formData,
  onFormChange,
  countries,
  gradeLevels,
  onSubmit,
  onBatchSubmit
}) => {
  const [mode, setMode] = useState<'single' | 'batch'>('single');
  const [parsedEmployees, setParsedEmployees] = useState<ParsedEmployee[]>([]);
  const [uploadError, setUploadError] = useState<string>('');

  const handleEmployeesParsed = (employees: ParsedEmployee[]) => {
    setParsedEmployees(employees);
    setUploadError('');
  };

  const handleBatchSubmit = () => {
    const validEmployees = parsedEmployees.filter(emp => emp.isValid);
    if (validEmployees.length === 0) {
      setUploadError('No valid employees to add');
      return;
    }

    const employeesToAdd = validEmployees.map(emp => ({
      name: emp.name,
      country: emp.country,
      state: emp.state,
      address: emp.address,
      role: emp.role,
      department: emp.department,
      gradeLevel: emp.gradeLevel
    }));

    if (onBatchSubmit) {
      onBatchSubmit(employeesToAdd);
      setParsedEmployees([]);
      setMode('single');
      onClose();
    }
  };

  const handleClose = () => {
    setParsedEmployees([]);
    setUploadError('');
    setMode('single');
    onClose();
  };

  const modalIcon = (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600">
      {mode === 'single' ? (
        <Plus className="h-5 w-5 text-white" />
      ) : (
        <Users className="h-5 w-5 text-white" />
      )}
    </div>
  );

  const getModalActions = () => {
    if (mode === 'batch' && parsedEmployees.length > 0) {
      const validCount = parsedEmployees.filter(emp => emp.isValid).length;
      return (
        <>
          <VButton variant="secondary" onClick={() => setMode('single')}>
            Back to Single
          </VButton>
          <VButton 
            variant="primary" 
            onClick={handleBatchSubmit}
            disabled={validCount === 0}
          >
            Add {validCount} Employee{validCount !== 1 ? 's' : ''}
          </VButton>
        </>
      );
    }

    if (mode === 'batch') {
      return (
        <VButton variant="secondary" onClick={() => setMode('single')}>
          Back to Single
        </VButton>
      );
    }

    return (
      <>
        <VButton variant="secondary" onClick={handleClose}>
          Cancel
        </VButton>
        <VButton variant="primary" onClick={onSubmit}>
          Add Employee
        </VButton>
      </>
    );
  };

  return (
    <VModal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'single' ? "Add New Employee" : "Batch Upload Employees"}
      subtitle={mode === 'single' ? "Welcome a new team member to your organization" : "Upload multiple employees using CSV file"}
      icon={modalIcon}
      iconGradient="from-blue-500 to-indigo-600"
      actions={getModalActions()}
      size={mode === 'batch' && parsedEmployees.length > 0 ? 'xl' : 'lg'}
    >
      <ModeToggle mode={mode} onModeChange={setMode} />

      {mode === 'single' ? (
        <SingleEmployeeForm
          formData={formData}
          onFormChange={onFormChange}
          countries={countries}
          gradeLevels={gradeLevels}
        />
      ) : (
        <BatchUploadForm
          countries={countries}
          gradeLevels={gradeLevels}
          onEmployeesParsed={handleEmployeesParsed}
          parsedEmployees={parsedEmployees}
          uploadError={uploadError}
        />
      )}
    </VModal>
  );
};

export default AddEmployeeModal;