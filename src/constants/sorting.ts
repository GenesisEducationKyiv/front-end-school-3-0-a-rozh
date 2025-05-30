export const SORT_OPTIONS_TUPLE = ['title', 'artist', 'album', 'createdAt'] as const;
export const SORT_ORDER_TUPLE = ['asc', 'desc'] as const;

// Named constants for better readability (derived from tuples)
export const SORT_FIELDS = {
    TITLE: SORT_OPTIONS_TUPLE[0],
    ARTIST: SORT_OPTIONS_TUPLE[1],
    ALBUM: SORT_OPTIONS_TUPLE[2],
    CREATED_AT: SORT_OPTIONS_TUPLE[3],
} as const;

export const SORT_DIRECTIONS = {
    ASC: SORT_ORDER_TUPLE[0],
    DESC: SORT_ORDER_TUPLE[1],
} as const;
