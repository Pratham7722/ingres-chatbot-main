import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { performOCR } from '@/services/mockApi';
import { toast } from 'sonner';

interface DocumentUploadProps {
  onTextExtracted: (text: string, fileName: string) => void;
}

const DocumentUpload = ({ onTextExtracted }: DocumentUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setUploadedFile(file);
    setUploading(true);

    try {
      const result = await performOCR(file);
      setExtractedText(result.text);
      toast.success(`Text extracted (${Math.round(result.confidence * 100)}% confidence)`);
    } catch (error) {
      console.error('OCR error:', error);
      toast.error('Failed to extract text from document');
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleSend = () => {
    if (extractedText && uploadedFile) {
      onTextExtracted(extractedText, uploadedFile.name);
      handleClear();
    }
  };

  const handleClear = () => {
    setUploadedFile(null);
    setExtractedText('');
  };

  if (uploadedFile) {
    return (
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <File className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium truncate max-w-[200px]">
              {uploadedFile.name}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {uploading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-sm text-muted-foreground">
              Processing document...
            </span>
          </div>
        ) : (
          <>
            <div className="bg-muted/50 rounded-lg p-3 max-h-32 overflow-y-auto">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {extractedText}
              </p>
            </div>
            <Button 
              onClick={handleSend}
              className="w-full"
            >
              Send Extracted Text
            </Button>
          </>
        )}
      </Card>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50 hover:bg-muted/50'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
      <p className="text-sm font-medium mb-1">
        {isDragActive ? 'Drop document here' : 'Upload Document'}
      </p>
      <p className="text-xs text-muted-foreground">
        Drag and drop or click to upload<br />
        (PDF, JPG, PNG up to 10MB)
      </p>
    </div>
  );
};

export default DocumentUpload;
