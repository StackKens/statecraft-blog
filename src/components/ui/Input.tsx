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
        className={className}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
