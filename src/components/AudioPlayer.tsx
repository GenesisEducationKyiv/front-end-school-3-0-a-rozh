import React, { useRef, useState, useEffect } from 'react';
import { HiOutlinePause, HiOutlinePlay } from 'react-icons/hi2';

import { BASE_URL } from '../services/api';
import { isAudioElement } from '../utils';

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

interface AudioPlayerProps {
    id: string;
    fileName: string;
    playingTrackId: string | null;
    setPlayingTrackId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AudioPlayer({
    id,
    playingTrackId,
    fileName,
    setPlayingTrackId,
}: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);

    const isActive = playingTrackId === id;

    useEffect(() => {
        if (!isActive && isPlaying && isAudioElement(audioRef.current)) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, [isActive, isPlaying]);

    useEffect(() => {
        if (!isActive && playingTrackId && isAudioElement(audioRef.current)) {
            audioRef.current.currentTime = 0;
        }
    }, [isActive, playingTrackId]);

    const togglePlay = () => {
        if (!isAudioElement(audioRef.current)) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            setPlayingTrackId(null);
        } else {
            setPlayingTrackId(id);
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleTimeUpdate = () => {
        if (!isAudioElement(audioRef.current)) return;

        const { currentTime, duration } = audioRef.current;
        setCurrentTime(currentTime);
        setProgress((currentTime / duration) * 100 || 0);
    };

    const handleLoadedMetadata = () => {
        if (isAudioElement(audioRef.current) && audioRef.current.duration) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isAudioElement(audioRef.current) || !progressRef.current) return;

        const rect = progressRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;
        audioRef.current.currentTime = newTime;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (isAudioElement(audioRef.current)) {
            audioRef.current.volume = newVolume;
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!isAudioElement(audio)) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        audio.load();

        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [id]);

    return (
        <div
            className="flex h-8 items-center gap-2 p-2 rounded border border-gray-300 text-xs"
            data-testid={`audio-player-${id}`}
        >
            <button
                onClick={togglePlay}
                data-testid={isPlaying ? `pause-button-${id}` : `play-button-${id}`}
                className="text-black text-sm px-1.5 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
                {isPlaying ? <HiOutlinePause /> : <HiOutlinePlay />}
            </button>

            <div className="flex flex-col w-18 gap-0.5">
                <div
                    ref={progressRef}
                    onClick={handleProgressClick}
                    className="w-full h-1 bg-gray-200 rounded cursor-pointer relative"
                >
                    <div
                        className="absolute top-0 left-0 h-full bg-blue-500"
                        style={{ width: `${progress}%` }}
                        data-testid={`audio-progress-${id}`}
                    />
                </div>
                <div className="text-center text-xs">
                    {formatTime(currentTime)} / {formatTime(duration)}
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
                <source src={`${BASE_URL}files/${fileName}`} type="audio/mpeg" />
            </audio>
        </div>
    );
}
