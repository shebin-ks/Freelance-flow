import { SearchIcon, X } from "lucide-react";
import { useState } from "react";

type Props = {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const ChatHeading = ({ searchTerm, setSearchTerm }: Props) => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="flex items-center justify-between mb-4">

            <h2 className="text-xl font-semibold px-2">Chats</h2>

            {showSearch ? (
                <div className="flex items-center gap-2 justify-end">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="border border-gray-300 w-3/4 px-3 py-1 rounded-md outline-none transition-all duration-200"
                    />
                    <button onClick={() => {
                        setShowSearch(false);
                        setSearchTerm("");
                    }}>
                        <X className="w-5 h-5 text-gray-500 cursor-pointer hover:text-black" />
                    </button>
                </div>
            ) : (
                <button onClick={() => setShowSearch(true)}>
                    <SearchIcon className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
                </button>
            )}
        </div>)
}

export default ChatHeading