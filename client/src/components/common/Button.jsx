function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-[var(--primary)]
        hover:bg-[var(--primary-hover)]
        disabled:opacity-50
        disabled:cursor-not-allowed
        transition-all
        duration-300
        px-6
        py-3
        rounded-xl
        font-semibold
        text-white
        w-full
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;