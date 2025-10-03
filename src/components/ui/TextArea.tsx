import { useEffect, useState } from "react";

interface TextAreaProps {
  label: string;
  maxChars: number;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

export default function textArea({
  label,
  maxChars,
  placeholder,
  value,
  error,
  ...props
}: TextAreaProps) {
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  return (
    <div className="flex w-full flex-col gap-2">
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        maxLength={maxChars}
        value={value}
        className={`peer bg-background min-h-32 w-full rounded-md border-2 p-1 transition-colors duration-200 focus:outline-0 ${error ? "placeholder:text-destructive-muted border-destructive-muted focus:border-destructive focus:placeholder:text-destructive" : "placeholder:text-muted border-muted focus:border-gray focus:placeholder:text-gray"}`}
        {...props}
      />
      <span className="text-xs">
        {charCount}/{maxChars}
      </span>
      {error && (
        <span className="peer-focus:text-destructive text-destructive-muted text-sm">
          {error}
        </span>
      )}
    </div>
  );
}
