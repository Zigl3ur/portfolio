interface InputProps {
  required?: boolean;
  label: string;
  placeholder: string;
  errors: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function Input({
  required,
  label,
  placeholder,
  errors,
  value,
  onChange
}: InputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label>{label}</label>
      <input
        required={required}
        placeholder={placeholder}
        className={`bg-background w-full rounded-md border-2 px-2 py-1 transition-colors duration-200 focus:outline-0 ${errors.length > 0 ? "placeholder:text-destructive-muted border-destructive-muted focus:border-destructive focus:placeholder:text-destructive" : "placeholder:text-muted border-muted focus:border-gray focus:placeholder:text-gray"}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {errors.length > 0 && (
        <span className="text-destructive-muted text-sm">{errors[0]}</span>
      )}
    </div>
  );
}
