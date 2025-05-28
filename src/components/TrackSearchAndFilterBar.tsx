import { HiOutlineSearch } from 'react-icons/hi';

import Spinner from './Spinner';

interface TrackSearchAndFilterBarProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    genres?: string[];
    selectedGenre: string;
    setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
    searchArtistQuery: string;
    setSearchArtistQuery: React.Dispatch<React.SetStateAction<string>>;
    isFetchingGenres: boolean;
}

export default function TrackSearchAndFilterBar({
    searchQuery,
    setSearchQuery,
    genres,
    selectedGenre,
    setSelectedGenre,
    searchArtistQuery,
    setSearchArtistQuery,
    isFetchingGenres,
}: TrackSearchAndFilterBarProps) {
    return (
        <div
            className="bg-gray-700 flex gap-7 lg:gap-10 justify-end text-slate-300 py-1 px-2 rounded-lg text-sm md:text-base"
            data-loading={isFetchingGenres ? 'true' : 'false'}
        >
            {/* GENRES */}
            {isFetchingGenres && (
                <div className="p-2">
                    <Spinner />
                </div>
            )}
            {genres && !isFetchingGenres && (
                <div className="flex gap-2 items-center">
                    <span>Select genre</span>
                    <div className="flex gap-2 items-center">
                        <select
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
                            data-testid="filter-genre"
                        >
                            <option value="" className="text-gray-400">
                                -
                            </option>
                            {[...new Set(genres)].map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            {/* ARTIST */}
            <div className="relative text-gray-400 focus-within:text-gray-200">
                <input
                    type="text"
                    value={searchArtistQuery}
                    onChange={(e) => setSearchArtistQuery(e.target.value)}
                    placeholder="Filter by Artist"
                    className="w-full bg-gray-700 text-white placeholder-gray-400 pl-1 pr-2 py-2 border-b-2 border-gray-500 ocus:border-gray-600  focus:outline-none transition"
                    data-testid="filter-artist"
                />
            </div>
            {/* SEARCH */}
            <div className="relative text-gray-400 focus-within:text-gray-200">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <HiOutlineSearch className="h-5 w-5" />
                </span>
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full bg-gray-700 text-white placeholder-gray-400 pl-8 pr-2 py-2 border-b-2 border-gray-500 focus:border-gray-600 focus:outline-none transition"
                    data-testid="search-input"
                />
            </div>
        </div>
    );
}
