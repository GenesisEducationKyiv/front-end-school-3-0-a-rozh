import { useSearchParams } from 'react-router-dom';
import { renderHook } from '@testing-library/react';
import { O } from '@mobily/ts-belt';
import { describe, test, expect, vi } from 'vitest';

import { useTracksParamsOptions } from '../useTracksParamsOptions';

//Replace the real useSearchParams dependency with a mock and assert that mock was called, not only what the hook returns - a mockist approach

const URL_TEST_PARAMS = 'search=rock&genre=metal&page=2&sort=title&order=asc';

vi.mock('react-router-dom', () => ({
    useSearchParams: vi.fn(() => [new URLSearchParams(URL_TEST_PARAMS)]),
}));

describe('useTracksParamsOptions - Mockist', () => {
    test('should parse all search params correctly', () => {
        const { result } = renderHook(() => useTracksParamsOptions());

        expect(O.isSome(result.current.searchOption)).toBe(true);
        expect(O.isNone(result.current.artistOption)).toBe(true);
        expect(O.getExn(result.current.searchOption)).toBe('rock');
        expect(O.getExn(result.current.genreOption)).toBe('metal');
        expect(O.getExn(result.current.pageOption)).toBe(2);
    });

    test('should call useSearchParams', () => {
        expect(vi.mocked(useSearchParams)).toHaveBeenCalled();
    });
});
