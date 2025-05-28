import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    type TrackFormData,
    type TracksParams,
    type Track,
    type TracksResponse,
    type Genres,
} from '../types/apiTypes';

export const BASE_URL = 'http://localhost:8000/api/';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Tracks'],
    endpoints: (builder) => ({
        //TRACKS
        getTracks: builder.query<TracksResponse, TracksParams>({
            query: ({ page, sort, order, search, genre, artist }) => {
                let query = `tracks?page=${page}`;
                if (sort) query += `&sort=${sort}`;
                if (order) query += `&order=${order}`;
                if (search) query += `&search=${search}`;
                if (genre) query += `&genre=${genre}`;
                if (artist) query += `&artist=${artist}`;
                return query;
            },
            providesTags: ['Tracks'],
        }),
        getTrackBySlug: builder.query<Track, string>({
            query: (slug) => `tracks/${slug}`,
            providesTags: (_result, _error, slug) => [{ type: 'Tracks', id: slug }],
        }),
        createTrack: builder.mutation<Track, TrackFormData>({
            query: (newTrack) => ({
                url: 'tracks',
                method: 'POST',
                body: newTrack,
            }),
            invalidatesTags: ['Tracks'],
        }),
        updateTrack: builder.mutation<
            Track,
            { track: TrackFormData; id: string; slug: string }
        >({
            query: ({ track, id }) => ({
                url: `tracks/${id}`,
                method: 'PUT',
                body: track,
            }),
            invalidatesTags: (_result, _error, { slug }) => [
                'Tracks',
                { type: 'Tracks', id: slug },
            ],
        }),
        deleteTrack: builder.mutation<void, string>({
            query: (id) => ({
                url: `tracks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tracks'],
        }),
        deleteMultipleTracks: builder.mutation<void, string[]>({
            query: (trackIds) => ({
                url: `tracks/delete`,
                method: 'post',
                body: { ids: trackIds },
            }),
            invalidatesTags: ['Tracks'],
        }),
        //GENRES
        getGenres: builder.query<Genres, void>({
            query: () => 'genres',
        }),
        //FILES
        uploadTrackFile: builder.mutation<void, { id: string; file: File }>({
            query: ({ id, file }) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: `/tracks/${id}/upload`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Tracks'],
        }),
        deleteFile: builder.mutation<void, string>({
            query: (id) => ({
                url: `tracks/${id}/file`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tracks'],
        }),
    }),
});

export const {
    //TRACKS
    useGetTracksQuery,
    useGetTrackBySlugQuery,
    useCreateTrackMutation,
    useDeleteTrackMutation,
    useDeleteMultipleTracksMutation,
    useUpdateTrackMutation,
    //GENRES
    useGetGenresQuery,
    //FILES
    useUploadTrackFileMutation,
    useDeleteFileMutation,
} = api;
