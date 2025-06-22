import React, { useEffect, useRef } from 'react';

import { BASE_URL } from '../../services/api';
import { audioActions } from '../../store/features/audio/audioSlice';
import { formatTime, isAudioElement } from '../../utils';

import PlayButton from './PlayButton';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
    selectDuration,
    selectVolume,
    selectCurrentTime,
    selectIsPlaying,
    selectPlayingTrackId,
    selectPlayingTrackName,
} from '../../store/features/audio/audioSelectors';

export default function AudioPlayer() {
    const dispatch = useAppDispatch();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playingTrackId = useAppSelector(selectPlayingTrackId);
    const playingTrackName = useAppSelector(selectPlayingTrackName);
    const isPlaying = useAppSelector(selectIsPlaying);
    const currentTime = useAppSelector(selectCurrentTime);
    const duration = useAppSelector(selectDuration);
    const volume = useAppSelector(selectVolume);

    const progress = duration ? (currentTime / duration) * 100 : 0;

    useEffect(() => {
        const audio = audioRef.current;
        if (!isAudioElement(audio)) return;

        const handleMetadata = () => {
            const dur = audio.duration;
            if (!isNaN(dur) && dur > 0) {
                dispatch(audioActions.setDuration(dur));
            }
        };

        const handleTimeUpdate = () => {
            dispatch(audioActions.setCurrentTime(audio.currentTime));
        };

        const handlePlay = () => dispatch(audioActions.setIsPlaying(true));
        const handlePause = () => dispatch(audioActions.setIsPlaying(false));

        audio.addEventListener('loadedmetadata', handleMetadata);
        audio.addEventListener('durationchange', handleMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('loadedmetadata', handleMetadata);
            audio.removeEventListener('durationchange', handleMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [dispatch]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!isAudioElement(audio)) return;

        if (playingTrackId) {
            audio.load();
        }
    }, [playingTrackId]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!isAudioElement(audio)) return;

        if (!playingTrackId) return;

        if (isPlaying && audio.paused) {
            const tryPlay = () => {
                audio.removeEventListener('canplay', tryPlay);
                void audio.play().catch(() => {});
            };

            if (audio.readyState >= 3) {
                void audio.play().catch(() => {});
            } else {
                audio.addEventListener('canplay', tryPlay);
            }
        } else if (!isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [isPlaying, playingTrackId]);

    useEffect(() => {
        const audio = audioRef.current;
        if (isAudioElement(audio)) {
            audio.volume = volume;
        }
    }, [volume]);

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isAudioElement(audioRef.current) || !duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;

        audioRef.current.currentTime = newTime;
        dispatch(audioActions.setCurrentTime(newTime));
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        dispatch(audioActions.setVolume(newVolume));
    };

    return (
        <div
            className="flex h-8 items-center gap-2 p-2 rounded border border-gray-300 text-xs"
            data-testid="audio-player-top"
        >
            <PlayButton trackId={playingTrackId} trackName={playingTrackName} />

            <div className="flex flex-col w-18 gap-0.5">
                <div
                    onClick={handleProgressClick}
                    className="w-full h-1 bg-gray-200 rounded cursor-pointer relative"
                >
                    <div
                        className="absolute top-0 left-0 h-full bg-blue-500"
                        style={{ width: `${progress}%` }}
                        data-testid="audio-progress-top"
                    />
                </div>

                <div className="flex justify-between text-xs text-gray-600">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="w-12"
                title="Volume"
            />

            <audio ref={audioRef}>
                <source
                    src={`${BASE_URL}files/${playingTrackId}.mp3`}
                    type="audio/mpeg"
                />
            </audio>
        </div>
    );
}
