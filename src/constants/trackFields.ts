import { TrackSchema } from '@/types/apiSchemas';

type TrackKey = keyof typeof TrackSchema.shape;

export const TRACK_FIELDS = {
    TITLE: 'title',
    ARTIST: 'artist',
    ALBUM: 'album',
    GENRES: 'genres',
    COVER_IMAGE: 'coverImage',
    CREATED_AT: 'createdAt',
} as const satisfies Record<string, TrackKey>;
