import { MouseEvent, ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  Icon?: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  children: ReactNode;
}

function Button({ onClick, Icon, variant = "primary", className, children }: ButtonProps) {
  const primaryClass = "text-white bg-blue-600 hover:bg-blue-700";
  const secondaryClass = "text-gray-700 bg-gray-100 hover:bg-gray-200";

  return (
    <button
      onClick={onClick}
      className={classNames(
        "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
        { [primaryClass]: variant == "primary" },
        { [secondaryClass]: variant == "secondary" },
        className
      )}
    >
      {Icon}
      {children}
    </button>
  );
}

export default Button;
