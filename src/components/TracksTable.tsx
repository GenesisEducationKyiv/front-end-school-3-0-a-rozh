import { useState } from 'react';

import TracksRow from './TracksRow';
import SortingTableButton from './SortingTableButton';
import Spinner from './Spinner';
import { SORT_DIRECTIONS, TRACK_FIELDS } from '../constants/';

import { type TracksResponse, type TracksSortOptions } from '../types/apiSchemas';
import { useSearchParams } from 'react-router-dom';
import { useParsedTracksParams } from '../hooks/useParsedTracksParams';
import { TRACK_PARAMS } from '../constants/trackParams';

interface TracksTableProps {
    tracks: TracksResponse | undefined;
    isFetchingTracks: boolean;
    selectedTracksIds: string[];
    setSelectedTracksIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TracksTable({
    tracks,
    isFetchingTracks,
    selectedTracksIds,
    setSelectedTracksIds,
}: TracksTableProps) {
    const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const { page, sort, order } = useParsedTracksParams();

    function setPage(page: number) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(TRACK_PARAMS.PAGE, String(page));
        setSearchParams(newParams);
    }

    function changeSortingOrder(column: TracksSortOptions) {
        const newParams = new URLSearchParams(searchParams);
        if (sort !== column) {
            newParams.set(TRACK_PARAMS.SORT, column);
            newParams.set(TRACK_PARAMS.ORDER, SORT_DIRECTIONS.ASC);
            setSearchParams(newParams);
            return;
        }

        if (order === SORT_DIRECTIONS.ASC) {
            newParams.set(TRACK_PARAMS.ORDER, SORT_DIRECTIONS.DESC);
            setSearchParams(newParams);
            return;
        }

        newParams.delete(TRACK_PARAMS.SORT);
        newParams.delete(TRACK_PARAMS.ORDER);
        setSearchParams(newParams);
    }

    const handleSelectAllTracks = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (tracks) {
            const trackIds = tracks.data.map((track) => track.id);
            if (e.target.checked) {
                setSelectedTracksIds((prev) => {
                    const newTrackIds = trackIds.filter((track) => !prev.includes(track));
                    return [...prev, ...newTrackIds];
                });
            }
            if (!e.target.checked) {
                setSelectedTracksIds((prev) =>
                    prev.filter((track) => !trackIds.includes(track))
                );
            }
        }
    };

    const handleSelectTrack = (trackId: string) => {
        if (selectedTracksIds.includes(trackId)) {
            setSelectedTracksIds((prev) => prev.filter((id) => id !== trackId));
        } else {
            setSelectedTracksIds((prev) => [...prev, trackId]);
        }
    };

    const isAllTracksSelected =
        tracks && tracks.data.length
            ? tracks.data.length === selectedTracksIds.length
            : false;

    return (
        <div
            className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-700"
            data-loading={isFetchingTracks ? 'true' : 'false'}
        >
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                {/* HEADER */}
                <thead className="text-xs uppercase bg-gray-700 text-slate-300">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600  rounded-sm  focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                    checked={isAllTracksSelected}
                                    onChange={handleSelectAllTracks}
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Cover
                        </th>
                        <th scope="col" className="px-5 py-3">
                            <div className="flex items-center">
                                Song
                                <SortingTableButton
                                    isActive={sort === TRACK_FIELDS.TITLE}
                                    order={order}
                                    onClick={() => changeSortingOrder(TRACK_FIELDS.TITLE)}
                                />
                            </div>
                        </th>
                        <th scope="col" className="px-5 py-3">
                            <div className="flex items-center">
                                Artist
                                <SortingTableButton
                                    isActive={sort === TRACK_FIELDS.ARTIST}
                                    order={order}
                                    onClick={() =>
                                        changeSortingOrder(TRACK_FIELDS.ARTIST)
                                    }
                                />
                            </div>
                        </th>
                        <th scope="col" className="px-5 py-3">
                            <div className="flex items-center">
                                Album
                                <SortingTableButton
                                    isActive={sort === TRACK_FIELDS.ALBUM}
                                    order={order}
                                    onClick={() => changeSortingOrder(TRACK_FIELDS.ALBUM)}
                                />
                            </div>
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Genres
                        </th>
                        <th scope="col" className="px-5 py-3"></th>
                        <th scope="col" className="px-5 py-3"></th>
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {tracks &&
                        tracks.data.length >= 0 &&
                        !isFetchingTracks &&
                        tracks.data.map((track) => (
                            <TracksRow
                                track={track}
                                key={track.id}
                                playingTrackId={playingTrackId}
                                setPlayingTrackId={setPlayingTrackId}
                                isSelected={selectedTracksIds.includes(track.id)}
                                handleSelectTrack={handleSelectTrack}
                            />
                        ))}
                </tbody>
            </table>
            {tracks && tracks.data.length === 0 && (
                <div className="m-5 flex justify-center items-center text-slate-200">
                    No Resutls
                </div>
            )}
            {!tracks && !isFetchingTracks && (
                <div className="m-5 flex justify-center items-center text-slate-200">
                    Something went wrong
                </div>
            )}
            {isFetchingTracks && (
                // I am not sure, if /tracks is a main API call of this app, what is the 'mainier' indicator then the table one here?
                <div
                    className="m-5 flex justify-center  items-center"
                    data-testid="loading-indicator"
                >
                    <div data-testid="loading-tracks">
                        <Spinner />
                    </div>
                </div>
            )}

            {/* PAGINATION */}
            {tracks && !isFetchingTracks && (
                <nav
                    className="flex items-center justify-between  m-3"
                    aria-label="Table navigation"
                    data-testid="pagination"
                >
                    <span className="pl-2 text-sm font-normal text-gray-500 dark:text-gray-400 mb-0 block w-full ">
                        Showing{' '}
                        {tracks.meta.total === 0
                            ? 0
                            : (tracks.meta.page - 1) * tracks.meta.limit + 1}
                        -
                        {Math.min(
                            tracks.meta.page * tracks.meta.limit,
                            tracks.meta.total
                        )}{' '}
                        of {tracks.meta.total}
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 pr-2">
                        <li>
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className={`flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white rounded-l-lg ${
                                    page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                                }`}
                                data-testid="pagination-prev"
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from(
                            { length: tracks.meta.totalPages },
                            (_, i) => i + 1
                        ).map((pageNumber) => (
                            <li key={pageNumber}>
                                <button
                                    onClick={() => setPage(pageNumber)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer ${
                                        pageNumber === page
                                            ? 'bg-gray-600'
                                            : 'bg-gray-800'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={
                                    page === tracks.meta.totalPages ||
                                    tracks.data.length === 0
                                }
                                className={`flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white rounded-r-lg ${
                                    page === tracks.meta.totalPages ||
                                    tracks.data.length === 0
                                        ? 'cursor-not-allowed'
                                        : 'cursor-pointer'
                                }`}
                                data-testid="pagination-next"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}
