import React from 'react';
import { FormData, GradeLevel } from '../../types';
import { VInput } from '../ui/VInput';
import { VCountrySelect } from '../ui/VCountrySelect';
import { VTextarea } from '../ui/VTextarea';
import { VGradeLevelSelect } from '../ui/VGradeLevelSelect';

interface SingleEmployeeFormProps {
    formData: FormData;
    onFormChange: (data: FormData) => void;
    countries: string[];
    gradeLevels: GradeLevel[];
}

export const SingleEmployeeForm: React.FC<SingleEmployeeFormProps> = ({
    formData,
    onFormChange,
    countries,
    gradeLevels
}) => {
    const handleInputChange = (field: keyof FormData, value: string) => {
        onFormChange({ ...formData, [field]: value });
    };

    return (
        <>
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
        </>
    );
};