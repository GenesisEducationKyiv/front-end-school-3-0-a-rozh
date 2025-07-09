import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioState {
    playingTrackName: string | null;
    playingTrackId: string | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
}

const initialState: AudioState = {
    playingTrackName: null,
    playingTrackId: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setPlayingTrackName: (state, action: PayloadAction<string | null>) => {
            state.playingTrackName = action.payload;
        },
        setPlayingTrackId: (state, action: PayloadAction<string | null>) => {
            state.playingTrackId = action.payload;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        clearAudio: (state) => {
            state.playingTrackId = null;
            state.playingTrackName = null;
            state.isPlaying = false;
            state.currentTime = 0;
            state.duration = 0;
        },
    },
});

export const audioActions = audioSlice.actions;
export const audioReducer = audioSlice.reducer;
