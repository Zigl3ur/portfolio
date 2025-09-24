import { useEffect, useState } from "react";

interface TextAreaProps {
  required?: boolean;
  label: string;
  maxChars: number;
  placeholder: string;
  errors: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function textArea({
  required,
  label,
  maxChars,
  placeholder,
  errors,
  value,
  onChange
}: TextAreaProps) {
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    console.log(charCount);
  }, [charCount]);

  return (
    <div className="flex w-full flex-col gap-2">
      <label>{label}</label>
      <div className="relative">
        <textarea
          required={required}
          placeholder={placeholder}
          className={`bg-background min-h-32 w-full rounded-md border-2 p-1 transition-colors duration-200 focus:outline-0 ${errors.length > 0 ? "placeholder:text-destructive-muted border-destructive-muted focus:border-destructive focus:placeholder:text-destructive" : "placeholder:text-muted border-muted focus:border-gray focus:placeholder:text-gray"}`}
          value={value}
          onChange={(e) => {
            const content = e.target.value;
            const contentChars = content.trim().length;

            if (contentChars > maxChars) return;

            onChange(content);
            setCharCount(contentChars);
          }}
        />
        <span className="relative bottom-0 text-xs">
          {charCount}/{maxChars}
        </span>
      </div>
      {errors.length > 0 && (
        <span className="text-destructive-muted text-sm">{errors[0]}</span>
      )}
    </div>
  );
}
