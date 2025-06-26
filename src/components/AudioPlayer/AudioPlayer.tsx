import React, { useEffect, useRef } from 'react';

import { BASE_URL } from '../../services/api';
import { isAudioElement } from '../../utils';

import { audioActions } from '../../store/features/audio/audioSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
    selectVolume,
    selectIsPlaying,
    selectPlayingTrackId,
    selectPlayingTrackName,
} from '../../store/features/audio/audioSelectors';

import PlayButton from './PlayButton';
import TrackProgress from './TrackProgress';

export default function AudioPlayer() {
    const dispatch = useAppDispatch();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playingTrackId = useAppSelector(selectPlayingTrackId);
    const playingTrackName = useAppSelector(selectPlayingTrackName);
    const isPlaying = useAppSelector(selectIsPlaying);
    const volume = useAppSelector(selectVolume);

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
        if (!playingTrackId) {
            audio.pause();
            audio.currentTime = 0;
        } else {
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
            <TrackProgress audioRef={audioRef} />

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
