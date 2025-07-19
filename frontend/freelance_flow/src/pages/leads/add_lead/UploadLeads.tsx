import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadLeadsExcel } from '../../../redux/features/leads/leadThunk';
import type { AppDispatch, RootState } from '../../../redux/store';
import { X } from 'lucide-react';


interface UploadLeadsProps {
    setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsUpload: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadLeads: React.FC<UploadLeadsProps> = ({ setIsModelOpen, setIsUpload }) => {
    const [file, setFile] = useState<File | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const { addLeadStatus, addLeadError } = useSelector((state: RootState) => state.leads);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                alert('File size should not exceed 5MB.');
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }

        dispatch(uploadLeadsExcel(file)).unwrap();

    };

    useEffect(() => {
        if (addLeadStatus === 'succeeded') {
            setFile(null);
        }

    }, [addLeadStatus])

    const isLoading = addLeadStatus === 'loading';
    const isSuccess = addLeadStatus === 'succeeded';
    const isError = addLeadStatus === 'failed';

    return (
        <div className="flex flex-col gap-3 mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Upload Excel</h2>
                <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={
                        () => {
                            setIsUpload(false)
                            setIsModelOpen(false)
                        }
                    }
                >
                    <X className="w-6 h-6 cursor-pointer" />
                </button>
            </div>


            {isSuccess && (
                <div className="mb-4 p-2 text-sm rounded-md bg-green-100 text-green-700">
                    Leads uploaded successfully!
                </div>
            )}

            {isError && addLeadError && (
                <div className="mb-4 p-2 text-sm rounded-md bg-red-100 text-red-700">
                    {addLeadError}
                </div>

            )}

            <input
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
                disabled={isLoading}
                className="block w-full h-10 px-2 py-1.5 text-gray-700 border border-gray-300 rounded-md cursor-pointer
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />

            {file && (
                <p className="mb-4 text-sm text-gray-600 font-medium">
                    Selected file: <span className="font-semibold">{file.name}</span>
                </p>
            )}

            <button
                onClick={handleUpload}
                disabled={isLoading || !file}
                className={`w-full py-3 rounded-md text-white font-semibold transition-colors cursor-pointer 
                    ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {isLoading ? 'Uploading...' : 'Upload'}
            </button>


        </div>
    );
};

export default UploadLeads;
