import { describe, test, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../../src/services/api';
import type { TrackFormData } from '../../src/types/apiSchemas';

const createTestStore = () => {
    return configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    });
};

describe('API + Store Integration', () => {
    let store: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        store = createTestStore();
        store.dispatch(api.util.resetApiState());
    });

    test('fetches tracks and caches result', async () => {
        const result = await store.dispatch(
            api.endpoints.getTracks.initiate({ page: 1 })
        );

        expect(result.data).toBeDefined();
        expect(result.data?.data).toHaveLength(2);
        expect(result.data?.data[0].title).toBe('Test Track 1');

        const cache = api.endpoints.getTracks.select({ page: 1 })(store.getState());
        expect(cache.data).toBeDefined();
        expect(cache.status).toBe('fulfilled');
    });

    test('creates track and invalidates cache', async () => {
        await store.dispatch(api.endpoints.getTracks.initiate({ page: 1 }));

        const newTrackData: TrackFormData = {
            title: 'New Test Track',
            artist: 'New Artist',
            album: 'New Album',
            genres: ['rock'],
            coverImage: 'http://example.com/new-cover.jpg',
        };

        const createResult = await store.dispatch(
            api.endpoints.createTrack.initiate(newTrackData)
        );

        expect(createResult.data?.title).toBe('New Test Track');

        const cache = api.endpoints.getTracks.select({ page: 1 })(store.getState());
        expect(cache.status).not.toBe('fulfilled');
    });

    test('updates track and clears specific cache', async () => {
        const trackResult = await store.dispatch(
            api.endpoints.getTrackBySlug.initiate('test-track-1')
        );
        expect(trackResult.data?.title).toBe('Test Track 1');

        const updateData: TrackFormData = {
            title: 'Updated Track Title',
            artist: 'Updated Artist',
            album: 'Updated Album',
            genres: ['jazz'],
        };

        const updateResult = await store.dispatch(
            api.endpoints.updateTrack.initiate({
                track: updateData,
                id: '1',
                slug: 'test-track-1',
            })
        );

        expect(updateResult.data?.title).toBe('Updated Track Title');

        const cache = api.endpoints.getTrackBySlug.select('test-track-1')(
            store.getState()
        );
        expect(cache.status).not.toBe('fulfilled');
    });

    test('deletes track and clears cache', async () => {
        await store.dispatch(api.endpoints.getTracks.initiate({ page: 1 }));
        await store.dispatch(api.endpoints.deleteTrack.initiate('1'));

        const cache = api.endpoints.getTracks.select({ page: 1 })(store.getState());
        expect(cache.status).not.toBe('fulfilled');
    });

    test('uploads file and invalidates track cache', async () => {
        const file = new File(['test'], 'test.mp3', { type: 'audio/mpeg' });

        const uploadResult = await store.dispatch(
            api.endpoints.uploadTrackFile.initiate({
                id: '2',
                file,
            })
        );

        expect(uploadResult.error).toBeUndefined();

        const cache = api.endpoints.getTracks.select({ page: 1 })(store.getState());
        expect(cache.status).not.toBe('fulfilled');

        const deleteResult = await store.dispatch(api.endpoints.deleteFile.initiate('2'));
        expect(deleteResult.error).toBeUndefined();

        const afterDeleteCache = api.endpoints.getTracks.select({ page: 1 })(
            store.getState()
        );
        expect(afterDeleteCache.status).not.toBe('fulfilled');
    });

    test('handles API error from unknown slug', async () => {
        const result = await store.dispatch(
            api.endpoints.getTrackBySlug.initiate('non-existent-slug')
        );

        if (result.error && 'status' in result.error) {
            expect(result.error.status).toBe(404);
        }

        const cache = api.endpoints.getTrackBySlug.select('non-existent-slug')(
            store.getState()
        );
        expect(cache.status).toBe('rejected');
        expect(cache.error).toBeDefined();
    });
});
