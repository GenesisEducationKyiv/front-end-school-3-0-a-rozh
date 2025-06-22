import { HiOutlineTrash } from 'react-icons/hi2';
import toast from 'react-hot-toast';

import {
    useDeleteMultipleTracksMutation,
    useGetGenresQuery,
    useGetTracksQuery,
} from '../services/api';

import TracksTable from '../components/TracksTable';
import TracksModal from '../components/TracksModal';
import TrackSearchAndFilterBar from '../components/TrackSearchAndFilterBar';
import ConfirmationModal from '../components/ConfirmationModal';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';

import { useTracksParamsParsed } from '../hooks/useTracksParamsParsed';
import { useAutoPaginationCorrection } from '../hooks/useAutoPaginationCorrection';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';

import { selectPlayingTrackName } from '../store/features/audio/audioSelectors';
import {
    selectSelectedTracksCount,
    selectSelectedTracksIds,
} from '../store/features/tracks/trackSelectors';
import { tracksActions } from '../store/features/tracks/tracksSlice';

export default function Tracks() {
    const params = useTracksParamsParsed();
    const dispatch = useAppDispatch();
    const playingTrackName = useAppSelector(selectPlayingTrackName);

    const { data: tracks, isFetching: isFetchingTracks } = useGetTracksQuery(params);
    const { data: genres, isFetching: isFetchingGenres } = useGetGenresQuery();
    const [deleteMultipleTracks] = useDeleteMultipleTracksMutation();

    const selectedTracksIds = useAppSelector(selectSelectedTracksIds);
    const selectedTracksCount = useAppSelector(selectSelectedTracksCount);

    useAutoPaginationCorrection(tracks, params.page, isFetchingTracks);

    const handleDeleteMultipleTracks = () => {
        deleteMultipleTracks(selectedTracksIds)
            .unwrap()
            .then(() => {
                toast.success('Files deleted!');
                dispatch(tracksActions.clearSelection());
            })
            .catch(() => toast.error('Something went wrong.'));
    };

    return (
        <div className="px-10 pb-10 pt-5 lg:px-15 flex flex-col gap-3  bg-slate-400 min-h-dvh">
            <div className="text-5xl text-slate-700 font-bold">Music Tracks</div>
            <div className="flex items-center gap-2">
                <AudioPlayer />
                {playingTrackName && (
                    <div className="text-slate-800">
                        Now playing: <span className="font-bold">{playingTrackName}</span>
                    </div>
                )}
            </div>
            <div className="flex w-full ">
                {selectedTracksCount > 0 && (
                    <div className="flex gap-2 items-center">
                        <ConfirmationModal
                            text={`Are you sure you want to delete ${selectedTracksCount} track(s)`}
                            onConfirm={handleDeleteMultipleTracks}
                            trigger={
                                <button className="bg-red-500 text-white px-3 py-3 flex items-center justify-center rounded hover:bg-red-300 cursor-pointer">
                                    <HiOutlineTrash />
                                </button>
                            }
                        />

                        <span className="text-slate-800">{`${selectedTracksCount} Track(s) selected`}</span>
                    </div>
                )}
                <div className="ml-auto">
                    <TracksModal
                        genres={genres}
                        trigger={
                            <button
                                className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                data-testid="create-track-button"
                            >
                                Add New Track
                            </button>
                        }
                    />
                </div>
            </div>
            <div>
                <TrackSearchAndFilterBar
                    genres={genres}
                    isFetchingGenres={isFetchingGenres}
                />
            </div>
            <main>
                <TracksTable tracks={tracks} isFetchingTracks={isFetchingTracks} />
            </main>
        </div>
    );
}
