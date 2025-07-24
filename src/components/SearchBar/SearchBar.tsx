import { HiOutlineSearch } from 'react-icons/hi';

import './SearchBar.css';

/**
 * Props for the SearchBar component
 */
interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Placeholder text for the search input */
    placeholder?: string;
}

/**
 * A search input component with a search icon
 *
 * @param props - The component props extending HTML input attributes
 * @returns A styled search input with icon
 */
export default function SearchBar(props: SearchBarProps) {
    return (
        <div className="m3-searchbar">
            <span className="m3-searchbar-icon">
                <HiOutlineSearch className="h-5 w-5" />
            </span>
            <input
                type="search"
                className="m3-searchbar-input"
                placeholder="Search"
                data-testid="search-input"
                {...props}
            />
        </div>
    );
}
