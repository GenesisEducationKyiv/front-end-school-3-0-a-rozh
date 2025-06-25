export const MESSAGES = {
    TRACK_CREATED: 'Track created!',
    TRACK_DELETED: 'Track deleted!',
    TRACKS_SELECTED: (count: number) => `${count} Track(s) selected`,
    TRACKS_DELETED: 'Tracks deleted!',
    CONFIRM_DELETE_TRACK: 'Are you sure you want to delete this track?',
    CONFIRM_DELETE_TRACKS: (count: number) =>
        `Are you sure you want to delete ${count} track(s)?`,

    CONFIRM_DELETE_FILE: 'Are you sure you want to delete this file?',
    FILE_DELETED: 'File deleted!',

    SOMETHING_WRONG: 'Something went wrong.',
} as const;
