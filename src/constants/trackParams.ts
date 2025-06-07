import { TracksParamsSchema } from '../types/apiSchemas';

type TrackParamKey = keyof typeof TracksParamsSchema.shape;

export const TRACK_PARAMS = {
    PAGE: 'page',
    SORT: 'sort',
    ORDER: 'order',
    SEARCH: 'search',
    GENRE: 'genre',
    ARTIST: 'artist',
} as const satisfies Record<string, TrackParamKey>;
