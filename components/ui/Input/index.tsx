"use client";

import { FC, useId } from "react";
import { IInputProps } from "@/components/ui/Input/types";

const Input: FC<IInputProps> = ({
  label,
  error,
  className = "",
  id,
  isNumber,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`relative ${isNumber ? "w-16" : ""}`}>
      <input
        {...props}
        id={inputId}
        className={`block w-full bg-transparent border border-white/50 text-white p-4 focus:border-white focus:outline-none peer ${className}`}
        placeholder=" "
      />
      <label
        htmlFor={inputId}
        className={`absolute text-white/80 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent backdrop-blur-md px-2 peer-focus:px-2 peer-focus:text-black peer-focus:bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 select-none ${
          error ? "!-translate-y-[1.5em]" : ""
        }`}
      >
        {label}
      </label>
      {error && (
        <p className="mt-1 text-red-500 text-sm transition-all duration-300 ease-in-out opacity-100">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
