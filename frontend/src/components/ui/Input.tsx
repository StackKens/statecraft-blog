import type { InputProps } from "../../types/input";

export default function Input({
  placeholder,
  type,
  className,
  value,
  onChange,
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={` focus:ring-2 focus:ring-black/40 rounded-xl ${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
