import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type Props = {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>
}

const PasswordField = ({ password, setPassword }: Props) => {

    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className='relative'>
            <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer top-4 right-4 text-gray-600 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

        </div>
    )
}

export default PasswordField