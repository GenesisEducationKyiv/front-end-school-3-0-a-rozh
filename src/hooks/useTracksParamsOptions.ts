import { O, pipe } from '@mobily/ts-belt';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import {
    TracksSortOptions,
    TracksSortOptionsSchema,
    TracksSortOrderSchema,
    TracksSortOrder,
} from '../types/apiSchemas';
import { TRACK_PARAMS } from '../constants/trackParams';

interface UseTracksParamsOptionsProps {
    searchOption: O.Option<string>;
    artistOption: O.Option<string>;
    genreOption: O.Option<string>;
    pageOption: O.Option<number>;
    sortOption: O.Option<TracksSortOptions>;
    orderOption: O.Option<TracksSortOrder>;
}

export function useTracksParamsOptions(): UseTracksParamsOptionsProps {
    const [searchParams] = useSearchParams();

    const getStringParam = (key: string) =>
        pipe(
            O.fromNullable(searchParams.get(key)),
            O.map((v) => v.trim().toLowerCase()),
            O.filter((v) => v.length > 0)
        );

    const safeParsesToOption =
        <T>(schema: z.ZodSchema<T>) =>
        (value: string): O.Option<T> => {
            const result = schema.safeParse(value);
            return result.success ? O.fromNullable(result.data) : O.None;
        };

    const searchOption = getStringParam(TRACK_PARAMS.SEARCH);
    const artistOption = getStringParam(TRACK_PARAMS.ARTIST);
    const genreOption = getStringParam(TRACK_PARAMS.GENRE);
    const pageOption = pipe(
        getStringParam(TRACK_PARAMS.PAGE),
        O.map(Number),
        O.filter((v) => v > 0 && isFinite(v))
    );

    const sortOption = pipe(
        getStringParam(TRACK_PARAMS.SORT),
        O.flatMap(safeParsesToOption(TracksSortOptionsSchema))
    );

    const orderOption = pipe(
        getStringParam(TRACK_PARAMS.ORDER),
        O.flatMap(safeParsesToOption(TracksSortOrderSchema))
    );

    return {
        searchOption,
        artistOption,
        genreOption,
        pageOption,
        sortOption,
        orderOption,
    };
}
