import { useEffect, useState } from 'react';

import {
    useCreateTrackMutation,
    useGetGenresQuery,
    useGetTrackBySlugQuery,
    useUpdateTrackMutation,
} from '../services/api';

import { type TrackFormData, TrackFormDataSchema } from '../types/apiSchemas';

import Label from './Label';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

interface TrackFormProps {
    onClose: () => void;
    slug?: string;
}

export default function TrackForm({ onClose, slug }: TrackFormProps) {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [formData, setFormData] = useState<TrackFormData>({
        title: '',
        artist: '',
        album: '',
        genres: [],
        coverImage: '',
    });
    const [errors, setErrors] = useState<{
        title?: string;
        artist?: string;
        genres?: string;
        coverImage?: string;
        album?: string;
    }>({});

    const [createTrack, { isLoading: isCreatingTrack }] = useCreateTrackMutation();
    const [updateTrack, { isLoading: isUpdatingTrack }] = useUpdateTrackMutation();
    const { data: genres, isFetching: isFetchingGenres } = useGetGenresQuery();
    const {
        data: track,
        isFetching: isFetchingTrack,
        isSuccess: trackFetched,
    } = useGetTrackBySlugQuery(slug ?? '', {
        skip: !slug || isUpdatingTrack,
    });

    const isFormLoading =
        isFetchingGenres || isFetchingTrack || isCreatingTrack || isUpdatingTrack;

    useEffect(() => {
        if (trackFetched && track) {
            setFormData({
                title: track.title,
                artist: track.artist,
                album: track.album,
                genres: track.genres,
                coverImage: track.coverImage,
            });
        }
    }, [trackFetched, track]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleAddGenre = () => {
        if (selectedGenre && !formData.genres.includes(selectedGenre)) {
            setFormData((prev) => ({
                ...prev,
                genres: [...prev.genres, selectedGenre],
            }));
            setSelectedGenre('');
            setErrors((prev) => ({ ...prev, genres: undefined }));
        }
    };

    const handleRemoveGenre = (genreToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            genres: prev.genres.filter((genre) => genre !== genreToRemove),
        }));
        setErrors((prev) => ({ ...prev, genres: undefined }));
    };

    const validate = () => {
        setErrors({});

        const result = TrackFormDataSchema.safeParse(formData);

        if (!result.success) {
            const newErrors: typeof errors = {};

            result.error.errors.forEach((issue) => {
                const path = issue.path[0] as string;
                newErrors[path as keyof typeof errors] = issue.message;
            });

            setErrors(newErrors);
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        if (slug && track) {
            updateTrack({ track: formData, id: track.id, slug: track.slug })
                .unwrap()
                .then(() => {
                    toast.success('Track updated!');
                    onClose();
                })
                .catch(() => toast.error('Something went wrong.'));
        } else {
            createTrack(formData)
                .unwrap()
                .then(() => {
                    toast.success('Track created!');
                    onClose();
                })
                .catch(() => toast.error('Something went wrong.'));
        }
        onClose();
    };

    if (slug && !track && !isFetchingTrack)
        return <div className="m-20">Something went wrong</div>;

    return (
        <div
            className="w-120 p-6 bg-gray-800 text-slate-200 min-h-[400px] flex items-center justify-center"
            data-loading={isFormLoading ? 'true' : 'false'}
        >
            {isFormLoading && <Spinner />}

            {!isFormLoading && (
                <form
                    onSubmit={handleSubmit}
                    className=" w-120 space-y-4 p-6 bg-gray-800 text-slate-200 "
                    data-testid="track-form"
                >
                    <h2 className="text-2xl font-bold">Add Music Track</h2>

                    <div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full p-2 rounded bg-gray-800 border ${
                                errors.title ? 'border-red-500' : 'border-gray-700'
                            }`}
                            data-testid="input-title"
                        />
                        {errors.title && (
                            <p
                                className="mt-1 text-red-400 text-sm"
                                data-testid="error-title"
                            >
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="artist"
                            placeholder="Artist"
                            value={formData.artist}
                            onChange={handleChange}
                            className={`w-full p-2 rounded bg-gray-800 border ${
                                errors.artist ? 'border-red-500' : 'border-gray-700'
                            }`}
                            data-testid="input-artist"
                        />
                        {errors.artist && (
                            <p
                                className="mt-1 text-red-400 text-sm"
                                data-testid="error-artist"
                            >
                                {errors.artist}
                            </p>
                        )}
                    </div>

                    <input
                        type="text"
                        name="album"
                        placeholder="Album"
                        value={formData.album}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        data-testid="input-album"
                    />

                    {/* GENRES */}
                    <div>
                        <label className="block mb-1">Genres</label>

                        {/* SELECTED GENRES */}
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.genres.map((genre) => (
                                <Label key={genre}>
                                    {genre}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveGenre(genre)}
                                        className="ml-2 text-red-300 hover:text-red-500"
                                    >
                                        x
                                    </button>
                                </Label>
                            ))}
                        </div>
                        {errors.genres && (
                            <p
                                className="mb-2 text-red-400 text-sm"
                                data-testid="error-genre"
                            >
                                {errors.genres}
                            </p>
                        )}

                        {/* GENRES DROPDOWN */}
                        {!genres && (
                            <span className="text-red-400">Error getting genres</span>
                        )}

                        {genres && genres.length > 1 && (
                            <div className="flex gap-2 items-center">
                                <select
                                    value={selectedGenre}
                                    onChange={(e) => setSelectedGenre(e.target.value)}
                                    className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 text-white"
                                    data-testid="genre-selector"
                                >
                                    <option
                                        value=""
                                        disabled
                                        hidden
                                        className="text-gray-400"
                                    >
                                        Select a genre
                                    </option>
                                    {genres
                                        ?.filter(
                                            (genre) => !formData.genres.includes(genre)
                                        )
                                        .map((genre) => (
                                            <option key={genre} value={genre}>
                                                {genre}
                                            </option>
                                        ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={handleAddGenre}
                                    className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>

                    {/* IMAGE URL */}
                    <div>
                        <input
                            type="text"
                            name="coverImage"
                            placeholder="Cover Image URL"
                            value={formData.coverImage}
                            onChange={handleChange}
                            className={`w-full p-2 rounded bg-gray-800 border ${
                                errors.coverImage ? 'border-red-500' : 'border-gray-700'
                            }`}
                            data-testid="input-cover-image"
                        />
                        {errors.coverImage && (
                            <p
                                className="mt-1 text-red-400 text-sm"
                                data-testid="error-cover-image"
                            >
                                {errors.coverImage}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 p-2 rounded font-semibold cursor-pointer"
                        data-testid="submit-button"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}
