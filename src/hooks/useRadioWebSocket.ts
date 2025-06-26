import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { webSocketService } from '../services/websocket';

import { useGetTrackBySlugQuery } from '../services/api';

import { audioActions } from '../store/features/audio/audioSlice';
import { useAppSelector } from './useAppSelector';
import { selectIsRadioPlaying } from '../store/features/audio/audioSelectors';

export const useRadioWebSocket = () => {
    const [trackSlug, setTrackSlug] = useState<string | undefined>(undefined);
    const isRadioPlaying = useAppSelector(selectIsRadioPlaying);
    const dispatch = useDispatch();
    const isConnected = webSocketService.isConnected();

    const { data: track, isFetching } = useGetTrackBySlugQuery(trackSlug!, {
        skip: !trackSlug,
    });

    const prevIsRadioPlayingRef = useRef(isRadioPlaying);

    const handleStartRadio = () => {
        webSocketService.sendRadioStart();
    };

    const handleStopRadio = () => {
        webSocketService.sendRadioStop();
    };

    const handleRadioTrack = (slug: string) => {
        setTrackSlug(slug);
    };

    useEffect(() => {
        if (track && isRadioPlaying) {
            dispatch(audioActions.setPlayingTrackId(track.id));
            dispatch(audioActions.setPlayingTrackName(track.title));
            dispatch(audioActions.setIsPlaying(true));

            return;
        }
    }, [track, isRadioPlaying, dispatch]);

    useEffect(() => {
        const wasRadioPlaying = prevIsRadioPlayingRef.current;
        if (wasRadioPlaying && !isRadioPlaying && track) {
            dispatch(audioActions.clearAudio());
        }
        prevIsRadioPlayingRef.current = isRadioPlaying;
    }, [isRadioPlaying, dispatch, track]);

    useEffect(() => {
        const handleRadioStatus = (status: boolean) => {
            dispatch(audioActions.setIsRadioPlaying(status));
        };

        webSocketService.connect();
        webSocketService.onRadioStatus(handleRadioStatus);
        webSocketService.onRadioTrack(handleRadioTrack);

        return () => {
            webSocketService.disconnect();
        };
    }, [dispatch]);

    return { handleStartRadio, handleStopRadio, isFetching, isConnected };
};
