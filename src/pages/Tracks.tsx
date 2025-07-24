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
import FilledButton from '../components/FilledButton/FilledButton';
import Spinner from '../components/Spinner';

import { useTracksParamsParsed } from '../hooks/useTracksParamsParsed';
import { useAutoPaginationCorrection } from '../hooks/useAutoPaginationCorrection';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';

import {
    selectIsRadioPlaying,
    selectPlayingTrackName,
} from '../store/features/audio/audioSelectors';
import {
    selectSelectedTracksCount,
    selectSelectedTracksIds,
} from '../store/features/tracks/trackSelectors';
import { tracksActions } from '../store/features/tracks/tracksSlice';

import { MESSAGES } from '../constants';
import { useRadioWebSocket } from '../hooks/useRadioWebSocket';

export default function Tracks() {
    const params = useTracksParamsParsed();
    const dispatch = useAppDispatch();

    const playingTrackName = useAppSelector(selectPlayingTrackName);
    const isRadioPlaying = useAppSelector(selectIsRadioPlaying);

    const { data: tracks, isFetching: isFetchingTracks } = useGetTracksQuery(params);
    const { data: genres, isFetching: isFetchingGenres } = useGetGenresQuery();

    const { handleStartRadio, handleStopRadio, isFetching, isConnected } =
        useRadioWebSocket();
    const [deleteMultipleTracks] = useDeleteMultipleTracksMutation();

    const selectedTracksIds = useAppSelector(selectSelectedTracksIds);
    const selectedTracksCount = useAppSelector(selectSelectedTracksCount);

    useAutoPaginationCorrection(tracks, params.page, isFetchingTracks);

    const handleDeleteMultipleTracks = () => {
        deleteMultipleTracks(selectedTracksIds)
            .unwrap()
            .then(() => {
                toast.success(MESSAGES.TRACKS_DELETED);
                dispatch(tracksActions.clearSelection());
            })
            .catch(() => toast.error(MESSAGES.SOMETHING_WRONG));
    };

    return (
        <div className="px-10 pb-10 pt-5 lg:px-15 flex flex-col gap-3  bg-slate-400 min-h-dvh">
            <div className="text-5xl text-slate-700 font-bold">Music Tracks</div>
            <div className="flex items-center gap-2">
                {isRadioPlaying ? (
                    <FilledButton
                        size="medium"
                        color="reject"
                        label="Stop Radio"
                        data-testid="stop-radio-button"
                        onClick={handleStopRadio}
                        disabled={!isConnected}
                    />
                ) : (
                    <FilledButton
                        size="medium"
                        color="accept"
                        label={isFetching ? <Spinner size="small" /> : 'Start Radio'}
                        data-testid="start-radio-button"
                        onClick={handleStartRadio}
                        disabled={!isConnected}
                    />
                )}

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
                            text={MESSAGES.CONFIRM_DELETE_TRACKS(selectedTracksCount)}
                            onConfirm={handleDeleteMultipleTracks}
                            trigger={
                                <button className="bg-red-500 text-white px-3 py-3 flex items-center justify-center rounded hover:bg-red-300 cursor-pointer">
                                    <HiOutlineTrash />
                                </button>
                            }
                        />

                        <span className="text-slate-800">
                            {MESSAGES.TRACKS_SELECTED(selectedTracksCount)}
                        </span>
                    </div>
                )}
                <div className="ml-auto">
                    <TracksModal
                        genres={genres}
                        trigger={
                            <FilledButton
                                label="Add New Track"
                                size="medium"
                                data-testid="create-track-button"
                            />
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
