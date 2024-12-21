import { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: ReactNode;
  variant?: "info" | "danger" | "success" | "";
  isDisabled?: boolean;
  withBackground?: boolean;
}

function IconButton({
  onClick,
  Icon,
  variant = "",
  className = "",
  type = "button",
  title = "",
  withBackground = false
}: ButtonProps) {
  const infoClass = withBackground
    ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
    : "text-blue-500 hover:bg-blue-50";

  const dangerClass = withBackground
    ? "bg-red-100 text-red-600 hover:bg-red-200"
    : "text-red-500 hover:bg-red-50";

  const successClass = withBackground ? "bg-green-100 text-green-600 hover:bg-green-200" : "";

  const defaultClass = "hover:bg-gray-100";

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      className={classNames(
        "rounded-full transition-colors",
        { [defaultClass]: variant == "" },
        { [infoClass]: variant == "info" },
        { [dangerClass]: variant == "danger" },
        { [successClass]: variant == "success" },
        withBackground ? "p-3" : "p-2",
        className
      )}
    >
      {Icon}
    </button>
  );
}

export default IconButton;
