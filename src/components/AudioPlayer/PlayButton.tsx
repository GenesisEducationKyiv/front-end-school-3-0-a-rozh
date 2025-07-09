import { HiOutlinePause, HiOutlinePlay } from 'react-icons/hi2';

import { audioActions } from '../../store/features/audio/audioSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
    selectIsPlaying,
    selectPlayingTrackId,
} from '../../store/features/audio/audioSelectors';

interface PlayButtonProps {
    trackId: string | null;
    trackName: string | null;
}

export default function PlayButton({ trackId, trackName }: PlayButtonProps) {
    const dispatch = useAppDispatch();

    const playingTrackId = useAppSelector(selectPlayingTrackId);
    const isPlaying = useAppSelector(selectIsPlaying);

    const isActive = playingTrackId === trackId;

    const togglePlay = () => {
        if (isActive) {
            dispatch(audioActions.setIsPlaying(!isPlaying));
        } else {
            dispatch(audioActions.setPlayingTrackId(trackId));
            dispatch(audioActions.setPlayingTrackName(trackName));
            dispatch(audioActions.setIsPlaying(true));
        }
    };

    return (
        <button
            onClick={togglePlay}
            data-testid={
                isActive && isPlaying
                    ? `pause-button-${trackId}`
                    : `play-button-${trackId}`
            }
            className="text-black text-sm px-1.5 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={!trackId}
        >
            {isActive && isPlaying ? <HiOutlinePause /> : <HiOutlinePlay />}
        </button>
    );
}
