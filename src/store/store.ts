import { configureStore } from '@reduxjs/toolkit';

import { api } from '../services/api';
import { audioReducer } from './features/audio/audioSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        audio: audioReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
