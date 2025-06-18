import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { renderHook } from '@testing-library/react';
import { O } from '@mobily/ts-belt';
import { describe, test, expect } from 'vitest';

import { useTracksParamsOptions } from '../useTracksParamsOptions';

//Use a real routing and assert what the hook actually returns - a classicist approach

const URL_TEST_PARAMS = '/?search=rock&genre=metal&page=2&sort=title&order=asc';

const createWrapper = (initialEntries: string[]) => {
    return function Wrapper({ children }: { children: React.ReactNode }) {
        const router = createMemoryRouter([{ path: '/', element: <>{children}</> }], {
            initialEntries,
        });
        return <RouterProvider router={router} />;
    };
};

describe('useTracksParamsOptions - Classicist', () => {
    test('should parse all search params correctly', () => {
        const wrapper = createWrapper([URL_TEST_PARAMS]);

        const { result } = renderHook(() => useTracksParamsOptions(), { wrapper });

        expect(O.isSome(result.current.searchOption)).toBe(true);
        expect(O.isNone(result.current.artistOption)).toBe(true);
        expect(O.getExn(result.current.searchOption)).toBe('rock');
        expect(O.getExn(result.current.genreOption)).toBe('metal');
        expect(O.getExn(result.current.pageOption)).toBe(2);
    });
});
