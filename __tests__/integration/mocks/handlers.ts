import { http, HttpResponse } from 'msw';
import type { Track, TracksResponse, Genres } from '../../../src/types/apiSchemas';

const BASE_URL = 'http://localhost:8000/api/';

const mockTracks: Track[] = [
    {
        id: '1',
        title: 'Test Track 1',
        artist: 'Test Artist 1',
        album: 'Test Album 1',
        genres: ['rock'],
        slug: 'test-track-1',
        coverImage: 'http://example.com/cover1.jpg',
        audioFile: 'http://example.com/track1.mp3',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: '2',
        title: 'Test Track 2',
        artist: 'Test Artist 2',
        album: 'Test Album 2',
        genres: ['jazz'],
        slug: 'test-track-2',
        coverImage: 'http://example.com/cover2.jpg',
        audioFile: undefined,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
    },
];

const mockGenres: Genres = ['rock', 'jazz', 'classical'];

let trackIdCounter = mockTracks.length + 1;

export const handlers = [
    http.get(`${BASE_URL}tracks`, () => {
        const response: TracksResponse = {
            data: mockTracks,
            meta: {
                total: mockTracks.length,
                page: 1,
                limit: 10,
                totalPages: 1,
            },
        };
        return HttpResponse.json(response);
    }),

    http.get(`${BASE_URL}tracks/:slug`, ({ params }) => {
        const { slug } = params;
        const track = mockTracks.find((track) => track.slug === slug);

        if (!track) {
            return new HttpResponse(null, { status: 404 });
        }

        return HttpResponse.json(track);
    }),

    http.post(`${BASE_URL}tracks`, async ({ request }) => {
        const newTrackData = (await request.json()) as Track;

        const newTrack: Track = {
            id: String(trackIdCounter++),
            slug: `${newTrackData.title
                .toLowerCase()
                .replace(/\s+/g, '-')}-${Date.now()}`,
            title: newTrackData.title,
            artist: newTrackData.artist,
            album: newTrackData.album,
            genres: newTrackData.genres,
            coverImage: newTrackData.coverImage,
            audioFile: undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        mockTracks.push(newTrack);
        return HttpResponse.json(newTrack, { status: 201 });
    }),

    http.put(`${BASE_URL}tracks/:id`, async ({ params, request }) => {
        const { id } = params;
        const updateData = (await request.json()) as Track;

        const trackIndex = mockTracks.findIndex((track) => track.id === id);
        if (trackIndex === -1) {
            return new HttpResponse(null, { status: 404 });
        }

        const updatedTrack = {
            ...mockTracks[trackIndex],
            ...updateData,
            updatedAt: new Date().toISOString(),
        };

        mockTracks[trackIndex] = updatedTrack;
        return HttpResponse.json(updatedTrack);
    }),

    http.delete(`${BASE_URL}tracks/:id`, ({ params }) => {
        const { id } = params;
        const trackIndex = mockTracks.findIndex((track) => track.id === id);

        if (trackIndex === -1) {
            return new HttpResponse(null, { status: 404 });
        }

        mockTracks.splice(trackIndex, 1);
        return new HttpResponse(null, { status: 204 });
    }),

    http.get(`${BASE_URL}genres`, () => {
        return HttpResponse.json(mockGenres);
    }),

    http.post(`${BASE_URL}tracks/:id/upload`, ({ params }) => {
        const { id } = params;
        const trackIndex = mockTracks.findIndex((track) => track.id === id);
        if (trackIndex === -1) {
            return new HttpResponse(null, { status: 404 });
        }

        mockTracks[trackIndex] = {
            ...mockTracks[trackIndex],
            audioFile: `http://example.com/uploads/track-${id}.mp3`,
            updatedAt: new Date().toISOString(),
        };

        return new HttpResponse(null, { status: 200 });
    }),

    http.delete(`${BASE_URL}tracks/:id/file`, ({ params }) => {
        const { id } = params;
        const trackIndex = mockTracks.findIndex((track) => track.id === id);

        if (trackIndex === -1) {
            return new HttpResponse(null, { status: 404 });
        }

        mockTracks[trackIndex] = {
            ...mockTracks[trackIndex],
            audioFile: undefined,
            updatedAt: new Date().toISOString(),
        };

        return new HttpResponse(null, { status: 200 });
    }),

    http.post(`${BASE_URL}tracks/delete`, async ({ request }) => {
        const { ids } = (await request.json()) as { ids: string[] };

        ids.forEach((id) => {
            const trackIndex = mockTracks.findIndex((t) => t.id === id);
            if (trackIndex !== -1) {
                mockTracks.splice(trackIndex, 1);
            }
        });

        return new HttpResponse(null, { status: 204 });
    }),
];
