export type Genres = string[];

export interface Track {
    id: string;
    title: string;
    artist: string;
    album?: string;
    genres: Genres;
    slug: string;
    coverImage?: string;
    audioFile?: string;
    createdAt: string;
    updatedAt: string;
}

export interface TrackFormData {
    title: string;
    artist: string;
    album?: string;
    genres: Genres;
    coverImage?: string;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface TracksResponse {
    data: Track[];
    meta: Meta;
}

export type TracksSortOptions = 'title' | 'artist' | 'album' | 'createdAt';
export type TracksSortOrder = 'asc' | 'desc';

export interface TracksParams {
    page: number;
    sort?: TracksSortOptions;
    order?: TracksSortOrder;
    search?: string;
    genre?: string;
    artist?: string;
}
