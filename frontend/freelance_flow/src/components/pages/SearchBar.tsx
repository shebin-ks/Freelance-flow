import React from 'react';
import { Search } from 'lucide-react';

interface Props {
    placeholder?: string;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, setSearchTerm, placeholder }) => {
    return (
        <div className="border border-gray-100 shadow-md p-6 bg-white rounded-md overflow-hidden">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder={placeholder ?? "Search leads..."}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;
