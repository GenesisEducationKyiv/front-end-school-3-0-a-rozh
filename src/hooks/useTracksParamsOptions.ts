import { useSearchParams } from 'react-router-dom';
import * as Belt from '@mobily/ts-belt';
import { pipe } from '@mobily/ts-belt';
import { z } from 'zod';

import {
    TracksSortOptions,
    TracksSortOptionsSchema,
    TracksSortOrderSchema,
    TracksSortOrder,
} from '../types/apiSchemas';
import { TRACK_PARAMS } from '../constants/trackParams';

interface UseTracksParamsOptionsProps {
    searchOption: Belt.Option<string>;
    artistOption: Belt.Option<string>;
    genreOption: Belt.Option<string>;
    pageOption: Belt.Option<number>;
    sortOption: Belt.Option<TracksSortOptions>;
    orderOption: Belt.Option<TracksSortOrder>;
}

export function useTracksParamsOptions(): UseTracksParamsOptionsProps {
    const [searchParams] = useSearchParams();

    const getStringParam = (key: string) =>
        pipe(
            Belt.O.fromNullable(searchParams.get(key)),
            Belt.O.map((v) => v.trim().toLowerCase()),
            Belt.O.filter((v) => v.length > 0)
        );

    const safeParsesToOption =
        <T>(schema: z.ZodSchema<T>) =>
        (value: string): Belt.Option<T> => {
            const result = schema.safeParse(value);
            return result.success ? Belt.O.fromNullable(result.data) : Belt.O.None;
        };

    const searchOption = getStringParam(TRACK_PARAMS.SEARCH);
    const artistOption = getStringParam(TRACK_PARAMS.ARTIST);
    const genreOption = getStringParam(TRACK_PARAMS.GENRE);
    const pageOption = pipe(
        getStringParam(TRACK_PARAMS.PAGE),
        Belt.O.map(Number),
        Belt.O.filter((v) => v > 0 && isFinite(v))
    );

    const sortOption = pipe(
        getStringParam(TRACK_PARAMS.SORT),
        Belt.O.flatMap(safeParsesToOption(TracksSortOptionsSchema))
    );

    const orderOption = pipe(
        getStringParam(TRACK_PARAMS.ORDER),
        Belt.O.flatMap(safeParsesToOption(TracksSortOrderSchema))
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
