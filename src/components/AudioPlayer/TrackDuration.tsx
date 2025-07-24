import { useState, useEffect } from 'react';

import { BASE_URL } from '../../services/api';
import { formatTime } from '../../utils';

interface TrackDurationProps {
    trackId: string;
}

export default function TrackDuration({ trackId }: TrackDurationProps) {
    const [duration, setDuration] = useState<number | null>(null);

    useEffect(() => {
        const audio = new Audio(`${BASE_URL}files/${trackId}.mp3`);
        audio.preload = 'metadata';

        const handleMetadata = () => {
            if (!isNaN(audio.duration)) {
                setDuration(audio.duration);
            }
        };

        audio.addEventListener('loadedmetadata', handleMetadata);

        return () => {
            audio.removeEventListener('loadedmetadata', handleMetadata);
            audio.src = '';
        };
    }, [trackId]);

    if (duration === null) {
        return <span className="text-gray-500">--:--</span>;
    }

    return <span>{formatTime(duration)}</span>;
}
