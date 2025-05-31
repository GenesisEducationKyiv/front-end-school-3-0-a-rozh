import { TRACK_FIELDS } from './trackFields';

export const SORT_DIRECTIONS = {
    ASC: 'asc',
    DESC: 'desc',
} as const;

export const SORT_OPTIONS_TUPLE = [
    TRACK_FIELDS.TITLE,
    TRACK_FIELDS.ARTIST,
    TRACK_FIELDS.ALBUM,
    TRACK_FIELDS.CREATED_AT,
] as const;

export const SORT_ORDER_TUPLE = [SORT_DIRECTIONS.ASC, SORT_DIRECTIONS.DESC] as const;
