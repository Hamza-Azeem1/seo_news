import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="mb-6">
            <div className="flex items-center border rounded-md overflow-hidden w-full max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Search by title or content..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="py-2 px-4 flex-grow focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-[#40e0d0] hover:bg-[#40e0d0] text-white text-2xl py-2 px-4"
                >
                    <BsSearch />
                </button>
            </div>
        </form>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;