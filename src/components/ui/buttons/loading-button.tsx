"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "../button";

interface LoadingButtonProps {
  isLoading?: boolean;
  icon?: LucideIcon;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  type: "button" | "submit" | "reset";
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  icon: Icon,
  title,
  onClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        disabled || isLoading
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-primary text-gray-500 hover:bg-primary-dark"
      }`}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        Icon && <Icon className="w-4 h-4" />
      )}
      {title}
    </Button>
  );
};

export default LoadingButton;
