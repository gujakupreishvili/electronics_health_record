"use client";
import React from "react";
import { useField } from "formik";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const Input = ({ label, name, type = "text", placeholder }: InputProps) => {
  const [field, meta] = useField(name);

  const inputClass =
    "w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          {...field}
          placeholder={placeholder}
          className={`${inputClass} min-h-[100px] resize-none`}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...field}
          value={field.value || ""}
          placeholder={placeholder}
          className={inputClass}
        />
      )}

      {meta.touched && meta.error && (
        <span className="text-red-500 text-xs">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
