import { type RootState } from '../../store';

export const selectPlayingTrackName = (state: RootState) => state.audio.playingTrackName;
export const selectPlayingTrackId = (state: RootState) => state.audio.playingTrackId;
export const selectIsPlaying = (state: RootState) => state.audio.isPlaying;
export const selectCurrentTime = (state: RootState) => state.audio.currentTime;
export const selectDuration = (state: RootState) => state.audio.duration;
export const selectVolume = (state: RootState) => state.audio.volume;
export const selectIsRadioPlaying = (state: RootState) => state.audio.isRadioPlaying;
