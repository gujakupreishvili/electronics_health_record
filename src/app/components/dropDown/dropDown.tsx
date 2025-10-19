"use client";
import React from "react";
import { useField } from "formik";

type Option = {
  label: string;
  value: string;
};

interface DropDownProps {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
}

const DropDown = ({ label, name, options, placeholder }: DropDownProps) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          {...field}
          onChange={(e) => helpers.setValue(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none pr-8"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="hover:bg-blue-100">
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <svg
            className="h-4 w-4 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {meta.touched && meta.error && (
        <span className="text-red-500 text-xs">{meta.error}</span>
      )}
    </div>
  );
};

export default DropDown;
