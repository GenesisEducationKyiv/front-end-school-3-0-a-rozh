export const SORT_FIELDS = {
    TITLE: 'title',
    ARTIST: 'artist',
    ALBUM: 'album',
    CREATED_AT: 'createdAt',
} as const;

export const SORT_DIRECTIONS = {
    ASC: 'asc',
    DESC: 'desc',
} as const;

export const SORT_OPTIONS_TUPLE = Object.values(SORT_FIELDS) as [
    typeof SORT_FIELDS.TITLE,
    typeof SORT_FIELDS.ARTIST,
    typeof SORT_FIELDS.ALBUM,
    typeof SORT_FIELDS.CREATED_AT
];

export const SORT_ORDER_TUPLE = Object.values(SORT_DIRECTIONS) as [
    typeof SORT_DIRECTIONS.ASC,
    typeof SORT_DIRECTIONS.DESC
];
