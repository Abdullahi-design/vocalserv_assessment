import React from 'react';
import { FileText, Download } from 'lucide-react';
import { VButton } from '../ui/VButton';

interface CSVTemplateDownloadProps {
    onDownload: () => void;
}

export const CSVTemplateDownload: React.FC<CSVTemplateDownloadProps> = ({ onDownload }) => (
    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                    <h4 className="font-medium text-blue-900">Download CSV Template</h4>
                    <p className="text-sm text-blue-700">Get the correct format for batch upload</p>
                </div>
            </div>
            <VButton variant="secondary" size="sm" onClick={onDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
            </VButton>
        </div>
    </div>
);