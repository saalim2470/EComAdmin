import React from "react";
import { CloseIcon } from "../../icons";

const BubbleChep = ({ value, onClick, className }) => {
  return (
    <div
      className={`flex w-auto items-center justify-between gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-theme-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 lg:inline-flex lg:w-auto ${className}`}
    >
      <span>{value}</span>
      <button onClick={() => onClick()}>
        <CloseIcon className="size-4" />
      </button>
    </div>
  );
};

export default BubbleChep;
