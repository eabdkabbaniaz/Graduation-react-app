import { useState } from "react";
export default function Button({
  name = "زر",
  signal = "+",
  className = "",
  onClick = () => { },
  type = "button",
  iconPosition = "end",
  variant = "default",
  transparentBackground = false,
  iconSize = "text-xl",
  backgroundColor,
  borderColor,
  textColor = "text-white",
  size = "normal",
  hoverText = "",
  borderRadius = "rounded-lg",
  marginTop = "mt-0",
}) {

  const [isHovered, setIsHovered] = useState(false);
  const variantClasses = {
    default: "bg-purple-600 hover:bg-purple-700",
    info: "bg-blue-500 hover:bg-blue-600",
    primary: "bg-green-500 hover:bg-green-600",
    danger: "bg-red-500 hover:bg-red-600",
  };



  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    normal: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-lg",
  };

  const backgroundClass = transparentBackground
    ? "bg-transparent border-none"
    : backgroundColor
      ? `bg-${backgroundColor} border-${borderColor}`
      : variantClasses[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}

      className={`flex items-center justify-center font-medium leading-5 ${sizeClasses[size]} ${textColor} transition-colors duration-150 ${backgroundClass} ${className} ${borderRadius} ${marginTop}`}
      style={{
        background: transparentBackground ? 'transparent' : undefined,
        borderColor: transparentBackground ? 'transparent' : borderColor,
      }}
    >
      {iconPosition === "start" && <span className={`${iconSize} mr-2`}>{signal}</span>}
      {name}
      {iconPosition === "end" && <span className={`${iconSize} ml-2`}>{signal}</span>}
      {isHovered && hoverText && (
        <span className="absolute bg-gray-700 text-white text-xs rounded-lg p-1 mt-2">
          {hoverText}
        </span>
      )}
    </button>
  );
}

