import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TRACK_PARAMS } from '../constants/trackParams';
import type { TracksResponse } from '../types/apiSchemas';

export function useAutoPaginationCorrection(
    tracks: TracksResponse | undefined,
    currentPage: number,
    isFetching: boolean
) {
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (isFetching || !tracks) return;
        const shouldNavigateToPreviousPage = tracks.data.length === 0 && currentPage > 1;

        if (shouldNavigateToPreviousPage) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.set(TRACK_PARAMS.PAGE, (currentPage - 1).toString());
                return newParams;
            });
        }
    }, [tracks, currentPage, setSearchParams, isFetching]);
}
