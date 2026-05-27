import type { InputProps } from "../../types/input";

export default function Input({ placeholder, type, className }: InputProps) {
  return (
    <div>
      <input type={type} placeholder={placeholder} className={className} />
    </div>
  );
}
