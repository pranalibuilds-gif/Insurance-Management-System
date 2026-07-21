import React, { useCallback, useState } from 'react';
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../atoms/Button';

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileSelect,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndSetFile = (file: File) => {
    setError(null);

    // Check size
    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit.`);
      return;
    }

    // Basic type check (can be improved with MIME types)
    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!accept.split(',').includes(ext)) {
      setError(`Invalid file type. Allowed: ${accept}`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, [maxSize, accept]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-8 transition-all duration-normal flex flex-col items-center justify-center text-center',
          isDragging ? 'border-brand-500 bg-brand-50/50' : 'border-neutral-200 bg-neutral-50/30',
          selectedFile ? 'border-success-500 bg-success-50/20' : '',
          error ? 'border-danger-500 bg-danger-50/20' : ''
        )}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept={accept}
        />

        {selectedFile ? (
          <div className="space-y-4">
            <div className="h-16 w-16 rounded-full bg-success-100 flex items-center justify-center text-success-600 mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <p className="font-bold text-neutral-900">{selectedFile.name}</p>
              <p className="text-xs text-neutral-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            </div>
            <Button variant="ghost" size="sm" onClick={clearFile} className="text-neutral-500">
              <X className="h-4 w-4 mr-2" /> Remove file
            </Button>
          </div>
        ) : (
          <>
            <div className={cn(
              'h-16 w-16 rounded-full flex items-center justify-center mb-4 transition-colors',
              error ? 'bg-danger-100 text-danger-600' : 'bg-neutral-100 text-neutral-400'
            )}>
              <Upload className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-neutral-900">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-neutral-500">
                {accept.toUpperCase().replace(/\./g, ' ')} (Max {maxSize / (1024 * 1024)}MB)
              </p>
            </div>
            {error && (
              <p className="mt-4 text-sm font-semibold text-danger-600 bg-danger-50 px-3 py-1 rounded-full">
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
