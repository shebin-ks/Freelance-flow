import React from 'react'

type Props = {
    id: string;
    label: string;
    type?: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const InputField = ({
    id, label, type = 'text',
    value, placeholder,
    required = false,
    onChange,
    className = '',

}: Props) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${className}`}
            />
        </div>
    );
}

export default InputField