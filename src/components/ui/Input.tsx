interface InputProps {
  inputLabel: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Input({
  inputLabel,
  placeholder,
  value,
  onChange
}: InputProps) {
  return (
    <div className="w-ful flex w-full flex-col gap-1">
      <label>{inputLabel}</label>
      <input
        placeholder={placeholder}
        className="placeholder:text-muted border-muted focus:border-gray focus:placeholder:text-gray flex w-full rounded-md border-2 p-1 transition-colors duration-200 focus:outline-0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
