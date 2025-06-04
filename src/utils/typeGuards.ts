import { TrackFormData, TrackFormDataSchema } from '../types/apiSchemas';

export function isAudioElement(
    element: HTMLAudioElement | null
): element is HTMLAudioElement {
    return element !== null && element instanceof HTMLAudioElement;
}

export function isValidTrackFormErrorPath(path: unknown): path is keyof TrackFormData {
    return typeof path === 'string' && path in TrackFormDataSchema.shape;
}
