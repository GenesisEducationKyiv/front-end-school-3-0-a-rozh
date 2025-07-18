import { formatTime } from '../../utils/helpers';
import { isAudioElement } from '../../utils/typeGuards';

import { audioActions } from '../../store/features/audio/audioSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
    selectCurrentTime,
    selectDuration,
    selectIsRadioPlaying,
} from '../../store/features/audio/audioSelectors';

export default function TrackProgress({
    audioRef,
}: {
    audioRef: React.RefObject<HTMLAudioElement>;
}) {
    const currentTime = useAppSelector(selectCurrentTime);
    const duration = useAppSelector(selectDuration);
    const isRadioPlaying = useAppSelector(selectIsRadioPlaying);
    const dispatch = useAppDispatch();

    const progress = duration ? (currentTime / duration) * 100 : 0;

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isAudioElement(audioRef.current) || !duration || isRadioPlaying) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;

        audioRef.current.currentTime = newTime;
        dispatch(audioActions.setCurrentTime(newTime));
    };

    return (
        <div className="flex flex-col w-18 gap-0.5">
            <div
                onClick={handleProgressClick}
                className="w-full h-1 bg-gray-200 rounded cursor-pointer relative"
            >
                <div
                    className={`absolute top-0 left-0 h-full ${
                        isRadioPlaying ? 'bg-blue-500 opacity-70' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                    data-testid="audio-progress-top"
                />
            </div>

            <div className="flex justify-between text-xs text-gray-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
}
