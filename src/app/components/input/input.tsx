
import React from "react";
import { FieldHookConfig, useField } from "formik";

type InputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement> & FieldHookConfig<string>;

export default function Input({ label, ...props }: InputProps) {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col gap-[4px]">
      <label htmlFor={props.id || props.name} className="font-semibold">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`border border-gray-300 rounded-[6px] p-[10px] focus:outline-none ${
          meta.touched && meta.error ? "border-red-500" : ""
        }`}
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-sm">{meta.error}</p>
      ) : null}
    </div>
  );
}
