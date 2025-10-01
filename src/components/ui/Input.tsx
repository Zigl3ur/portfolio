interface InputProps {
  type: string;
  label: string;
  placeholder: string;
  error?: string;
}

export default function Input({
  type,
  label,
  placeholder,
  error,
  ...props
}: InputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`peer bg-background w-full rounded-md border-2 px-2 py-1 transition-colors duration-200 focus:outline-0 ${error ? "placeholder:text-destructive-muted border-destructive-muted focus:border-destructive focus:placeholder:text-destructive" : "placeholder:text-muted border-muted focus:border-gray focus:placeholder:text-gray"}`}
        {...props}
      />
      {error && (
        <span className="text-destructive-muted peer-focus:text-destructive text-sm">
          {error}
        </span>
      )}
    </div>
  );
}
