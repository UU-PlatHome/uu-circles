import React from 'react'
import { BaseLabel, Props as BaseLabelProps } from './BaseLabel'

type SelectItem = {
    value: string
    label?: string
}

export type Props = {
    id: string
    name: string
    value: string
    required?: boolean
    placeholder?: string
    items: SelectItem[]
    error?: string
    onChange(e: any): void
} & BaseLabelProps
const BaseSelect: React.FC<Props> = ({ label, id, name, note, value, items, required, placeholder, error, onChange }) => {
    return (
        <div className="flex flex-col space-y-1 mb-4">
            <BaseLabel
                label={label}
                note={note}
                required={required}
                id={id}
            />

            <select
                id={id}
                name={name}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                value={value}
                onChange={onChange}
            >
                {items.map(() => {
                    return <option key={`${id}-${value}`} value={value}>{label ? label : value}</option>
                })}
            </select>

            {error ? (
                <p className="text-sm text-red-400">{error}</p>
            ) : ''}
        </div>
    )
}

export { BaseSelect }
