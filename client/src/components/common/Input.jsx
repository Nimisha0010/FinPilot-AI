function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[var(--text-secondary)]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          bg-[var(--surface)]
          border
          border-[var(--border)]
          text-[var(--text-primary)]
          placeholder:text-[var(--text-secondary)]
          outline-none
          focus:border-[var(--primary)]
        "
      />
    </div>
  );
}

export default Input;