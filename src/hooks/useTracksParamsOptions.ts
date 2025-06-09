import { useSearchParams } from 'react-router-dom';
import * as Belt from '@mobily/ts-belt';
import { pipe } from '@mobily/ts-belt';
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
        Belt.O.filter((v) => TracksSortOptionsSchema.safeParse(v).success),
        Belt.O.mapNullable((v) => TracksSortOptionsSchema.parse(v))
    );

    const orderOption = pipe(
        getStringParam(TRACK_PARAMS.ORDER),
        Belt.O.filter((v) => TracksSortOrderSchema.safeParse(v).success),
        Belt.O.mapNullable((v) => TracksSortOrderSchema.parse(v))
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
