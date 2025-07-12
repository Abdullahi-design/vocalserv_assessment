import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { VButton } from '../ui/VButton';

interface FileUploadZoneProps {
    onFileUpload: (file: File) => void;
    isDragOver: boolean;
    onDragOver: (isDragOver: boolean) => void;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
    onFileUpload,
    isDragOver,
    onDragOver
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        onDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        onDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        onDragOver(false);
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileUpload(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileUpload(file);
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                isDragOver
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
            />
            <Upload className={`h-8 w-8 mx-auto mb-3 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
            <p className="text-gray-600 mb-2">
                {isDragOver ? 'Drop your CSV file here' : 'Drag and drop your CSV file here, or'}
            </p>
            <VButton 
                variant="secondary" 
                onClick={() => fileInputRef.current?.click()}
            >
                Choose File
            </VButton>
        </div>
    );
};