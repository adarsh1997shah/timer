import { MouseEvent, ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  Icon?: ReactNode;
  variant?: "info" | "danger";
  className?: string;
  type?: "button" | "submit";
  isDisabled?: boolean;
  title?: string;
}

function IconButton({
  onClick,
  Icon,
  variant = "info",
  className = "",
  type = "button",
  title = ""
}: ButtonProps) {
  const infoClass = "text-blue-500 hover:bg-blue-50";
  const dangerClass = "text-red-500 hover:bg-red-50";

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      className={classNames("p-2 rounded-full transition-colors", {
        [infoClass]: variant == "info",
        [dangerClass]: variant == "danger",
        className
      })}
    >
      {Icon}
    </button>
  );
}

export default IconButton;
