import { test, expect } from '@playwright/test';

import { MESSAGES } from '../../src/constants';

const testTrack = {
    title: 'My Test Song',
    artist: 'Test Artist',
    album: 'Test Album',
    genre: 'Rock',
    coverImage: 'https://example.com/cover.jpg',
};

test('complete track lifecycle - add, view, search, delete', async ({ page }) => {
    // 1. User opens the app
    await page.goto('/tracks');
    await expect(page.getByText('Music Tracks')).toBeVisible();

    // 2. User adds a new track
    await page.getByTestId('create-track-button').click();
    await expect(page.getByTestId('track-form')).toBeVisible();

    await page.getByTestId('input-title').fill(testTrack.title);
    await page.getByTestId('input-artist').fill(testTrack.artist);
    await page.getByTestId('input-album').fill(testTrack.album);
    await page.getByTestId('genre-selector').selectOption(testTrack.genre);
    await page.getByTestId('add-genre-button').click();
    await page.getByTestId('input-cover-image').fill(testTrack.coverImage);
    await page.getByTestId('submit-button').click();

    // 3. Wait for track creation
    await expect(page.getByTestId('track-form')).not.toBeVisible();

    // Verify success toast
    await expect(page.getByTestId('toast-success')).toBeVisible();
    await expect(page.getByText(MESSAGES.TRACK_CREATED)).toBeVisible();

    // Extract ID
    const newTrack = page
        .locator('tr[data-testid^="track-item-"]')
        .filter({ hasText: testTrack.title });
    const trackTestId = await newTrack.getAttribute('data-testid');
    const createdTrackId = trackTestId?.replace('track-item-', '') || '';

    // Verify the specific track item
    const trackItem = page.getByTestId(`track-item-${createdTrackId}`);
    await expect(trackItem).toBeVisible();
    await expect(trackItem).toContainText(testTrack.title);
    await expect(trackItem).toContainText(testTrack.artist);

    // 4. User searches for their track
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill(testTrack.title);
    await expect(trackItem).toBeVisible();

    // 5. User clears search to see all tracks
    await searchInput.clear();
    await page.waitForTimeout(1000);
    await expect(trackItem).toBeVisible();

    // 6. User selects the specific track for deletion using checkbox
    const trackCheckbox = page.getByTestId(`checkbox-track-${createdTrackId}`);
    await trackCheckbox.check();
    await expect(page.getByText(MESSAGES.TRACKS_SELECTED(1))).toBeVisible();

    // 7. User deletes the specific track
    await page.getByTestId(`delete-track-${createdTrackId}`).click();
    await expect(page.getByTestId('confirm-dialog')).toBeVisible();
    await expect(page.getByText(MESSAGES.CONFIRM_DELETE_TRACK)).toBeVisible();
    await page.getByTestId('confirm-delete').click();

    // Verify success toast
    await expect(page.getByTestId('toast-success')).toBeVisible();
    await expect(page.getByText(MESSAGES.TRACK_DELETED)).toBeVisible();

    // Verify the specific track is gone
    await expect(trackItem).not.toBeVisible();
});
