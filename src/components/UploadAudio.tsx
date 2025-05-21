import { HiOutlineArrowUpOnSquare } from 'react-icons/hi2';
import toast from 'react-hot-toast';

import { useUploadTrackFileMutation } from '../services/api';

import Spinner from './Spinner';

const ALLOWED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; //10mb

interface UploadAudioProps {
    trackId: string;
    onFileError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function UploadAudio({ trackId, onFileError }: UploadAudioProps) {
    const [uploadTrackFile, { isLoading }] = useUploadTrackFileMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            onFileError('Unsupported file type. Only MP3 and WAV are allowed.');
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            onFileError(
                `File is too large. Max size is ${MAX_FILE_SIZE / (1024 * 1024)} MB.`
            );
            return;
        }

        uploadTrackFile({ id: trackId, file })
            .unwrap()
            .then(() => toast.success('File uploaded successfully!'))
            .catch(() => toast.error('Upload failed'));
    };
    return (
        <button className="w-full h-full" data-loading={isLoading ? 'true' : 'false'}>
            <label
                htmlFor={`file-upload-${trackId}`}
                className="py-1 w-full h-full flex items-center  justify-center gap-3 cursor-pointer"
            >
                {isLoading ? (
                    <div className="">
                        <Spinner size="small" />
                    </div>
                ) : (
                    <>
                        <HiOutlineArrowUpOnSquare />
                        <span>Upload file</span>
                    </>
                )}
            </label>
            <input
                id={`file-upload-${trackId}`}
                type="file"
                accept={ALLOWED_TYPES.join(',')}
                onChange={handleFileChange}
                onClick={(e) => ((e.target as HTMLInputElement).value = '')}
                className="hidden"
                data-testid={`upload-track-${trackId}`}
                disabled={isLoading}
                aria-disabled={isLoading}
            />
        </button>
    );
}
