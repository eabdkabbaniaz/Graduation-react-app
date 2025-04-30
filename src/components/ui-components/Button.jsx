import { useState } from "react";
export default function Button({
  name = "button",
  signal = "+",
  className = "",
  onClick = () => { },
  type = "button",
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
  parentStyle,
  lang
}) {

  const [isHovered, setIsHovered] = useState(false);
  const variantClasses = {
    default: "bg-purple-600 hover:bg-purple-700",
    info: "bg-blue-500 hover:bg-blue-600",
    primary: "bg-green-500 hover:bg-green-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  const sizeClasses = {
    small: "px-2 py-1",
    normal: "px-4 py-2",
    large: "px-9 py-1",
  };

  const backgroundClass = transparentBackground
    ? "bg-transparent border-none"
    : backgroundColor
      ? `bg-${backgroundColor} border-${borderColor}`
      : variantClasses[variant];

  return (
    <div className={parentStyle}>
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
      {name}
      <span className={`${iconSize} ml-2 ${lang === "ar" ?  "mr-2" : ""}`}>{signal}</span>
      {isHovered && hoverText && (
        <span className="absolute bg-gray-700 text-white text-xs rounded-lg p-1 mt-2">
          {hoverText}
        </span>
      )}
    </button>
    </div>
  );
}