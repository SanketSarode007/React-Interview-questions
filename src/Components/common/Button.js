import React from "react";
const Button = ({
  children,        // Text or content inside the button
  onClick,         // Function to handle button click
  style,           // Inline styles (optional)
  className,       // Custom class for styling (optional)
  variant = 'primary', // Button variant for different styles (e.g., primary, secondary)
  disabled = false,   // Disable button functionality
  loading = false, }) => {
  return (
    <button
      className={className}
      style={style}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;