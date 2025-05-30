import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { z } from 'zod';

import {
    type TrackFormData,
    type TracksParams,
    type Track,
    type TracksResponse,
    type Genres,
    TrackSchema,
    TracksResponseSchema,
    GenresSchema,
} from '../types/apiSchemas';

export const BASE_URL = 'http://localhost:8000/api/';

const validateResponse = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
    try {
        return schema.parse(data);
    } catch (error) {
        console.error('API response validation failed:', error);
        throw new Error(`Invalid API response: ${error}`);
    }
};

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
            transformResponse: (response: unknown) =>
                validateResponse<TracksResponse>(TracksResponseSchema, response),
            providesTags: ['Tracks'],
        }),
        getTrackBySlug: builder.query<Track, string>({
            query: (slug) => `tracks/${slug}`,
            transformResponse: (response: unknown) =>
                validateResponse<Track>(TrackSchema, response),
            providesTags: (_result, _error, slug) => [{ type: 'Tracks', id: slug }],
        }),
        createTrack: builder.mutation<Track, TrackFormData>({
            query: (newTrack) => ({
                url: 'tracks',
                method: 'POST',
                body: newTrack,
            }),
            transformResponse: (response: unknown) =>
                validateResponse<Track>(TrackSchema, response),
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
            transformResponse: (response: unknown) =>
                validateResponse<Track>(TrackSchema, response),
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
            transformResponse: (response: unknown) =>
                validateResponse<Genres>(GenresSchema, response),
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
