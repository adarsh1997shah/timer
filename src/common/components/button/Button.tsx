import { MouseEvent, ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  Icon?: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  isDisabled?: boolean;
}

function Button({
  onClick,
  Icon,
  variant = "primary",
  className,
  children,
  type = "button",
  isDisabled = false
}: ButtonProps) {
  const primaryClass = classNames("text-white", { "bg-blue-600 hover:bg-blue-700": !isDisabled });
  const secondaryClass = "text-gray-700 bg-gray-100 hover:bg-gray-200";

  const disableClass = classNames("cursor-not-allowed", { "bg-blue-400": variant == "primary" });

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
        { [primaryClass]: variant == "primary" },
        { [secondaryClass]: variant == "secondary" },
        { [disableClass]: isDisabled },
        className
      )}
    >
      {Icon}
      {children}
    </button>
  );
}

export default Button;
