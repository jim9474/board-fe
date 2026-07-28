import React, {useState} from 'react';
import type { ChangeEvent } from 'react';

interface FileUploadProps {
    //onFileSelect: (file: File | null) => void;
    onFileSelect: (files: File[]) => void;
}

const FileUploadComp: React.FC<FileUploadProps> = ({ onFileSelect }) => {
    //const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    //const [fileName, setFileName] = useState<string | null>(null);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [fileNames, setFileNames] = useState<string[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // const file = e.target.files?.[0] || null;
        // onFileSelect(file); // 상위 컴포넌트에 전달

        // if (file) {
        //     setFileName(file.name);

        //     // 이미지일 경우 미리보기
        //     if (file.type.startsWith('image/')) {
        //         const reader = new FileReader();
        //         reader.onloadend = () => {
        //             setPreviewUrl(reader.result as string);
        //         };
        //         reader.readAsDataURL(file);
        //     } else {
        //         setPreviewUrl(null);
        //     }
        // } else {
        //     setFileName(null);
        //     setPreviewUrl(null);
        // }
        const files = e.target.files ? Array.from(e.target.files) : [];
        onFileSelect(files);

        const names: string[] = [];
        const previews: string[] = [];

        files.forEach(file => {
            names.push(file.name);

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrls(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            }
        });
        setFileNames(names);
        setPreviewUrls([]);
    };

    return (
        <div className='file-upload-comp'>
            <label>
                <input type="file" onChange={handleFileChange} multiple />
            </label>

            {/* {fileName && <p>선택된 파일: {fileName}</p>} */}

            {/* {previewUrl && (
                <div>
                    <img src={previewUrl} alt='미리보기' style={{ maxWidth: '200px', marginTop: '10px' }} />
                </div>
            )} */}
            {fileNames.length > 0 && (
                <ul>
                    {fileNames.map((name, idx) => (
                        <li key={idx}>{name}</li>
                    ))}
                </ul>
            )}

            {previewUrls.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {previewUrls.map((url, idx) => (
                        <img
                            key={idx}
                            src={url}
                            alt={`preview-${idx}`}
                            style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploadComp;
