import { O } from '@mobily/ts-belt';

import { useTracksParamsOptions } from './useTracksParamsOptions';
import { type TracksParams } from '../types/apiSchemas';

export function useTracksParamsParsed(): TracksParams {
    const {
        pageOption,
        searchOption,
        artistOption,
        genreOption,
        sortOption,
        orderOption,
    } = useTracksParamsOptions();

    const page = O.getWithDefault(pageOption, 1);
    const search = O.toUndefined(searchOption);
    const artist = O.toUndefined(artistOption);
    const genre = O.toUndefined(genreOption);
    const sort = O.toUndefined(sortOption);
    const order = O.toUndefined(orderOption);

    return { page, search, artist, genre, sort, order };
}
