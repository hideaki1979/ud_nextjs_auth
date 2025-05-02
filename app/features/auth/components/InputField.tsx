import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    type: string;
    placeholder: string;
    register: UseFormRegister<T>;
}

function InputField<T extends FieldValues>({ name, label, type, placeholder, register }: InputFieldProps<T>) {
    return (
        <div>
            <label
                htmlFor={name}
                className='text-gray-600 text-sm font-bold mb-2 block mt-4'
            >
                {label}
            </label>
            <input
                type={type}
                id={name}
                placeholder={placeholder}
                className='border rounded w-full shadow py-3 px-4 text-gray-700 leading-tight bg-white'
                {...register(name, { required: "この項目は必須です！！" })}
            />
        </div>
    )
}

export default InputField