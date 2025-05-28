import { useState } from 'react';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import toast from 'react-hot-toast';

import { useDeleteFileMutation, useDeleteTrackMutation } from '../services/api';

import Label from './Label';
import TracksModal from './TracksModal';
import AudioPlayer from './AudioPlayer';
import UploadAudio from './UploadAudio';
import ConfirmationModal from './ConfirmationModal';

import { type Track } from '../types/apiTypes';

interface TracksRowProps {
    track: Track;
    playingTrackId: string | null;
    setPlayingTrackId: React.Dispatch<React.SetStateAction<string | null>>;
    isSelected: boolean;
    handleSelectTrack: (id: string) => void;
}

export default function TracksRow({
    track,
    playingTrackId,
    setPlayingTrackId,
    isSelected,
    handleSelectTrack,
}: TracksRowProps) {
    const [fileError, setFileError] = useState<string | null>(null);
    const [deleteTrack] = useDeleteTrackMutation();
    const [deleteFile] = useDeleteFileMutation();
    const cover = track.coverImage || '/images/default-cover.jpg';
    return (
        <tr
            className="border-b bg-gray-800 border-gray-700   hover:bg-gray-600"
            data-testid={`track-item-${track.id}`}
        >
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600   rounded-sm  focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                        checked={isSelected}
                        onChange={() => handleSelectTrack(track.id)}
                    />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                    </label>
                </div>
            </td>

            <td className="px-6 py-4">
                <img
                    className="w-20 object-cover"
                    src={cover}
                    alt={`${track.title} song cover image`}
                />
            </td>
            <td className="px-6 py-4" data-testid={`track-item-${track.id}-title`}>
                {track.title}
            </td>
            <td className="px-6 py-4" data-testid={`track-item-${track.id}-artist`}>
                {track.artist}
            </td>
            <td className="px-6 py-4">{track.album}</td>
            <td className="px-6 py-4 flex gap-2 items-start flex-wrap">
                {track.genres.length > 0
                    ? track.genres.map((genre) => (
                          <Label size="small" key={genre}>
                              {genre}
                          </Label>
                      ))
                    : '-'}
            </td>
            {/* AUDIO FILE */}
            <td className="px-5 py-4">
                {track.audioFile && (
                    <div className="flex gap-2 items-center">
                        <AudioPlayer
                            id={track.id}
                            fileName={track.audioFile}
                            playingTrackId={playingTrackId}
                            setPlayingTrackId={setPlayingTrackId}
                        />
                        <ConfirmationModal
                            text="Are you sure you want to delete this file?"
                            onConfirm={() =>
                                deleteFile(track.id)
                                    .unwrap()
                                    .then(() => toast.success('File deleted!'))
                                    .catch(() => toast.error('Something went wrong.'))
                            }
                            trigger={
                                <button className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-xs hover:bg-red-300 cursor-pointer">
                                    <HiOutlineTrash />
                                </button>
                            }
                        />
                    </div>
                )}

                {!track.audioFile && (
                    <>
                        <div className=" bg-teal-800 hover:bg-teal-900 flex items-center justify-center rounded-xs text-white min-w-50">
                            <UploadAudio trackId={track.id} onFileError={setFileError} />
                        </div>
                        {fileError && (
                            <p
                                className="mt-1 text-red-400 text-sm bg-opacity-100 hover:bg-gray-600"
                                data-testid={`error-file-upload-${track.id}`}
                            >
                                {fileError}
                            </p>
                        )}
                    </>
                )}
            </td>
            {/* BUTTONS BLOCK */}
            <td className="px-4 py-4">
                <div className="flex gap-2">
                    <TracksModal
                        trigger={
                            <button
                                className="bg-teal-600 hover:bg-teal-700 w-6 h-6 flex items-center justify-center rounded-xs text-white cursor-pointer"
                                data-testid={`edit-track-${track.id}`}
                            >
                                <HiOutlinePencilSquare />
                            </button>
                        }
                        slug={track.slug}
                    />
                    <ConfirmationModal
                        text="Are you sure you want to delete this track?"
                        onConfirm={() =>
                            deleteTrack(track.id)
                                .unwrap()
                                .then(() => toast.success('Track deleted!'))
                                .catch(() => toast.error('Something went wrong.'))
                        }
                        trigger={
                            <button
                                className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-xs hover:bg-red-300 cursor-pointer"
                                data-testid={`delete-track-${track.id}`}
                            >
                                <HiOutlineTrash />
                            </button>
                        }
                    />
                </div>
            </td>
        </tr>
    );
}
