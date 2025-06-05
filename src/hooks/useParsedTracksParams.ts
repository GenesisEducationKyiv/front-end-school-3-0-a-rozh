import { useTracksQueryFilter } from './useTracksQueryFilter';
import * as Belt from '@mobily/ts-belt';
import { type TracksParams } from '../types/apiSchemas';

export function useParsedTracksParams(): TracksParams {
    const {
        pageOption,
        searchOption,
        artistOption,
        genreOption,
        sortOption,
        orderOption,
    } = useTracksQueryFilter();

    const page = Belt.O.getWithDefault(pageOption, 1);
    const search = Belt.O.toUndefined(searchOption);
    const artist = Belt.O.toUndefined(artistOption);
    const genre = Belt.O.toUndefined(genreOption);
    const sort = Belt.O.toUndefined(sortOption);
    const order = Belt.O.toUndefined(orderOption);

    return { page, search, artist, genre, sort, order };
}
