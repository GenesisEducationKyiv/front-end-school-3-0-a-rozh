import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectionState {
    selectedTracksIds: string[];
}

const initialState: SelectionState = {
    selectedTracksIds: [],
};

const tracksSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        toggleTrackSelection: (state, action: PayloadAction<string>) => {
            const trackId = action.payload;
            if (state.selectedTracksIds.includes(trackId)) {
                state.selectedTracksIds = state.selectedTracksIds.filter(
                    (id) => id !== trackId
                );
            } else {
                state.selectedTracksIds.push(trackId);
            }
        },
        selectMultipleTracks: (state, action: PayloadAction<string[]>) => {
            const trackIds = action.payload;
            trackIds.forEach((trackId) => {
                if (!state.selectedTracksIds.includes(trackId)) {
                    state.selectedTracksIds.push(trackId);
                }
            });
        },
        deselectMultipleTracks: (state, action: PayloadAction<string[]>) => {
            const trackIds = action.payload;
            state.selectedTracksIds = state.selectedTracksIds.filter(
                (id) => !trackIds.includes(id)
            );
        },
        clearSelection: (state) => {
            state.selectedTracksIds = [];
        },
    },
});

export const tracksActions = tracksSlice.actions;
export const tracksReducer = tracksSlice.reducer;
