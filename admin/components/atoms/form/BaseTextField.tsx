import React from 'react'
import { BaseLabel, Props as BaseLabelProps } from './BaseLabel'

export type Props = {
    id: string
    name: string
    value: string
    required?: boolean
    placeholder?: string
    error?: string
    onChange(e: any): void
} & BaseLabelProps
const BaseTextField: React.FC<Props> = ({ label, id, name, note, value, required, placeholder, error, onChange }) => {
    return (
        <div className="flex flex-col space-y-1 mb-4">
            <BaseLabel
                label={label}
                note={note}
                required={required}
                id={id}
            />

            <input
                type="text"
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
            {error ? (
                <p className="text-sm text-red-400">{error}</p>
            ) : ''}
        </div>
    )
}

export { BaseTextField }
