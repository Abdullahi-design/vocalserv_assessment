import React, { useState } from 'react';
import { GradeLevel, Employee } from '../../types';
import { CSVTemplateDownload } from './CSVTemplateDownload';
import { FileUploadZone } from './FileUploadZone';
import { EmployeePreviewTable } from './EmployeePreviewTable';

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

interface BatchUploadFormProps {
    countries: string[];
    gradeLevels: GradeLevel[];
    onEmployeesParsed: (employees: ParsedEmployee[]) => void;
    parsedEmployees: ParsedEmployee[];
    uploadError: string;
}

export const BatchUploadForm: React.FC<BatchUploadFormProps> = ({
    countries,
    gradeLevels,
    onEmployeesParsed,
    parsedEmployees,
    uploadError
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const downloadSampleCSV = () => {
    const sampleData = [
      ['name', 'country', 'state', 'address', 'role', 'department', 'gradeLevel'],
      ['Abdullahi Sani Mohammed', 'Nigeria', 'Kano', '123 danbare', 'Software Engineer', 'Engineering', 'LVL3'],
      ['Jane Smith', 'United Kingdom', 'London', '456 Oak Ave', 'Product Manager', 'Product', 'LVL4'],
      ['Ahmed Hassan', 'Nigeria', 'Lagos', '789 Victoria Island', 'Designer', 'Design', 'LVL2']
    ];

    const csvContent = sampleData.map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'employee_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const parseCSV = (text: string): ParsedEmployee[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());
    const expectedHeaders = ['name', 'country', 'state', 'address', 'role', 'department', 'gradelevel'];
    
    // Validate headers
    const hasRequiredHeaders = expectedHeaders.every(header => 
      headers.some(h => h.includes(header) || header.includes(h))
    );

    if (!hasRequiredHeaders) {
      throw new Error('Invalid CSV format. Please use the sample template.');
    }

    return lines.slice(1).map((line, index) => {
      const values = line.split(',').map(v => v.replace(/"/g, '').trim());
      const employee: ParsedEmployee = {
        name: values[headers.indexOf('name')] || '',
        country: values[headers.indexOf('country')] || '',
        state: values[headers.indexOf('state')] || '',
        address: values[headers.indexOf('address')] || '',
        role: values[headers.indexOf('role')] || '',
        department: values[headers.indexOf('department')] || '',
        gradeLevel: values[headers.indexOf('gradelevel')] || '',
        isValid: true,
        errors: []
      };

      // Validate required fields
      if (!employee.name) employee.errors.push('Name is required');
      if (!employee.country) employee.errors.push('Country is required');
      if (!employee.role) employee.errors.push('Role is required');
      if (!employee.department) employee.errors.push('Department is required');

      // Validate country exists
      if (employee.country && !countries.includes(employee.country)) {
        employee.errors.push('Invalid country');
      }

      // Validate grade level if provided
      if (employee.gradeLevel && !gradeLevels.some(gl => gl.name === employee.gradeLevel)) {
        employee.errors.push('Invalid grade level');
      }

      employee.isValid = employee.errors.length === 0;
      return employee;
    }).filter(emp => emp.name); // Filter out empty rows
  };

  const handleFileUpload = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      throw new Error('Please upload a CSV file');
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = parseCSV(text);
        onEmployeesParsed(parsed);
        
        if (parsed.length === 0) {
          throw new Error('No valid employee data found in the CSV file');
        }
      } catch (error) {
        throw error;
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <CSVTemplateDownload onDownload={downloadSampleCSV} />
      
      <FileUploadZone
        onFileUpload={handleFileUpload}
        isDragOver={isDragOver}
        onDragOver={setIsDragOver}
      />

      {uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{uploadError}</p>
        </div>
      )}

      {parsedEmployees.length > 0 && (
        <EmployeePreviewTable employees={parsedEmployees} />
      )}
    </div>
  );
};