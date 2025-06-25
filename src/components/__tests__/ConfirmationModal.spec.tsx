import { test, expect } from '@playwright/experimental-ct-react';
import { Locator } from '@playwright/test';
import assert from 'assert';
import ConfirmationModal from '../ConfirmationModal';

const createModal = (onConfirm = () => {}) => (
    <ConfirmationModal
        trigger={<button data-testid="delete-btn">Delete</button>}
        text="Confirm deletion"
        onConfirm={onConfirm}
    />
);

const openModal = async (component: Locator) => {
    await component.getByTestId('delete-btn').click();
    await expect(component.getByTestId('confirm-dialog')).toBeVisible();
};

test('modal opens when trigger is clicked', async ({ mount }) => {
    const component = await mount(createModal());

    await expect(component.getByTestId('confirm-dialog')).not.toBeVisible();
    await component.getByTestId('delete-btn').click();
    await expect(component.getByTestId('confirm-dialog')).toBeVisible();
});

test('confirm button calls onConfirm callback', async ({ mount }) => {
    let confirmCalled = false;
    const component = await mount(
        createModal(() => {
            confirmCalled = true;
        })
    );

    await openModal(component);
    await component.getByTestId('confirm-delete').click();

    assert.strictEqual(confirmCalled, true);
});

test('cancel button closes modal without calling onConfirm', async ({ mount }) => {
    let confirmCalled = false;
    const component = await mount(
        createModal(() => {
            confirmCalled = true;
        })
    );

    await openModal(component);
    await component.getByTestId('cancel-delete').click();

    assert.strictEqual(confirmCalled, false);
    await expect(component.getByTestId('confirm-dialog')).not.toBeVisible();
});

test('modal closes when clicking close button', async ({ mount }) => {
    let confirmCalled = false;
    const component = await mount(
        createModal(() => {
            confirmCalled = true;
        })
    );

    await openModal(component);
    await component.locator('[role="dialog"] button').first().click();

    assert.strictEqual(confirmCalled, false);
    await expect(component.getByTestId('confirm-dialog')).not.toBeVisible();
});
