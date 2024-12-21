import classNames from "classnames";

interface ButtonProps {
  onClick: any;
  Icon: any;
  variant?: any;
  className: any;
  children: any;
}

function Button({ onClick, Icon, variant = "primary", className, children }: ButtonProps) {
  const primaryClass = "bg-blue-600 hover:bg-blue-700";

  return (
    <button
      onClick={onClick}
      className={classNames(
        "flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors",
        { [primaryClass]: variant == "primary" },
        className
      )}
    >
      {Icon}
      {children}
    </button>
  );
}

export default Button;
