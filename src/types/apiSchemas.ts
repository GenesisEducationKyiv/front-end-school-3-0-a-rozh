import { z } from 'zod';
import {
    VALIDATION_ERRORS,
    SORT_OPTIONS_TUPLE,
    SORT_ORDER_TUPLE,
} from '../constants/index';

export const GenresSchema = z.array(z.string()).min(1, VALIDATION_ERRORS.GENRES_REQUIRED);

export const TrackSchema = z.object({
    id: z.string(),
    title: z.string(),
    artist: z.string(),
    album: z.string().optional(),
    genres: z.array(z.string()),
    slug: z.string(),
    coverImage: z.string().optional(),
    audioFile: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const TrackFormDataSchema = z.object({
    title: z.string().trim().min(1, VALIDATION_ERRORS.TITLE_REQUIRED),
    artist: z.string().trim().min(1, VALIDATION_ERRORS.ARTIST_REQUIRED),
    album: z.string().optional(),
    genres: GenresSchema,
    coverImage: z
        .string()
        .url(VALIDATION_ERRORS.INVALID_IMAGE_URL)
        .optional()
        .or(z.literal('')),
});

export const MetaSchema = z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
});

export const TracksResponseSchema = z.object({
    data: z.array(TrackSchema),
    meta: MetaSchema,
});

export const TracksSortOptionsSchema = z.enum(SORT_OPTIONS_TUPLE);
export const TracksSortOrderSchema = z.enum(SORT_ORDER_TUPLE);

export const TracksParamsSchema = z.object({
    page: z.number(),
    sort: TracksSortOptionsSchema.optional(),
    order: TracksSortOrderSchema.optional(),
    search: z.string().optional(),
    genre: z.string().optional(),
    artist: z.string().optional(),
});

export type Genres = z.infer<typeof GenresSchema>;
export type Track = z.infer<typeof TrackSchema>;
export type TrackFormData = z.infer<typeof TrackFormDataSchema>;
export type Meta = z.infer<typeof MetaSchema>;
export type TracksResponse = z.infer<typeof TracksResponseSchema>;
export type TracksSortOptions = z.infer<typeof TracksSortOptionsSchema>;
export type TracksSortOrder = z.infer<typeof TracksSortOrderSchema>;
export type TracksParams = z.infer<typeof TracksParamsSchema>;
