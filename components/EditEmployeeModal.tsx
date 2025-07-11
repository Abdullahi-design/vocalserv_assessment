import React from 'react';
import { Edit } from 'lucide-react';
import { FormData, GradeLevel } from '../types';
import { VButton } from './ui/VButton';
import { VModal } from './ui/VModal';
import { VInput } from './ui/VInput';
import { VCountrySelect } from './ui/VCountrySelect';
import { VTextarea } from './ui/VTextarea';
import { VGradeLevelSelect } from './ui/VGradeLevelSelect';

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
  const handleInputChange = (field: keyof FormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  const modalIcon = (
    <div className="bg-gradient-to-br from-emerald-500 to-green-600">
      <Edit className="h-5 w-5 text-white" />
    </div>
  );

  const modalActions = (
    <>
      <VButton variant="secondary" onClick={onClose}>
        Cancel
      </VButton>
      <VButton variant="success" onClick={onSubmit}>
        Update Employee
      </VButton>
    </>
  );

  return (
    <VModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Employee"
      subtitle="Update employee information"
      icon={modalIcon}
      iconGradient="from-emerald-500 to-green-600"
      actions={modalActions}
    >
      <VInput
        placeholder="Full Name *"
        value={formData.name}
        onChange={(value) => handleInputChange('name', value)}
        required
      />
      
      <VCountrySelect
        countries={countries}
        value={formData.country}
        onChange={(value) => handleInputChange('country', value)}
        required
      />
      
      <VInput
        placeholder="State / Province"
        value={formData.state}
        onChange={(value) => handleInputChange('state', value)}
      />
      
      <VTextarea
        placeholder="Address"
        value={formData.address}
        onChange={(value) => handleInputChange('address', value)}
        rows={3}
      />
      
      <VInput
        placeholder="Job Role *"
        value={formData.role}
        onChange={(value) => handleInputChange('role', value)}
        required
      />
      
      <VInput
        placeholder="Department *"
        value={formData.department}
        onChange={(value) => handleInputChange('department', value)}
        required
      />
      
      <VGradeLevelSelect
        gradeLevels={gradeLevels}
        value={formData.gradeLevel}
        onChange={(value) => handleInputChange('gradeLevel', value)}
      />
    </VModal>
  );
};

export default EditEmployeeModal;