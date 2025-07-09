import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '../../store';

export const selectSelectedTracksIds = (state: RootState) =>
    state.tracks.selectedTracksIds;

export const selectSelectedTracksCount = createSelector(
    [selectSelectedTracksIds],
    (selectedIds) => selectedIds.length
);

export const selectSelectedTracksSet = createSelector(
    [selectSelectedTracksIds],
    (selectedIds) => new Set(selectedIds)
);

export const selectAreAllPageTracksSelected = (
    selectedIds: string[],
    pageTrackIds: string[]
): boolean => {
    if (pageTrackIds.length === 0) return false;
    return pageTrackIds.every((trackId) => selectedIds.includes(trackId));
};

export const selectAreSomePageTracksSelected = (
    selectedIds: string[],
    pageTrackIds: string[]
): boolean => {
    if (pageTrackIds.length === 0) return false;
    const selectedPageTracks = pageTrackIds.filter((trackId) =>
        selectedIds.includes(trackId)
    );
    return (
        selectedPageTracks.length > 0 && selectedPageTracks.length < pageTrackIds.length
    );
};
