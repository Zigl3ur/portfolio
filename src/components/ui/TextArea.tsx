import { useState } from "react";

interface TextAreaProps {
  label: string;
  maxChars: number;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

export default function textArea({
  label,
  maxChars,
  placeholder,
  error,
  onChange,
  ...props
}: TextAreaProps) {
  const [charCount, setCharCount] = useState<number>(0);

  return (
    <div className="flex w-full flex-col gap-2">
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        className={`peer bg-background min-h-32 w-full rounded-md border-2 p-1 transition-colors duration-200 focus:outline-0 ${error ? "placeholder:text-destructive-muted border-destructive-muted focus:border-destructive focus:placeholder:text-destructive" : "placeholder:text-muted border-muted focus:border-gray focus:placeholder:text-gray"}`}
        onChange={(e) => {
          const content = e.target.value;
          const contentChars = content.trim().length;

          if (contentChars > maxChars) return;

          onChange && onChange(e);
          setCharCount(contentChars);
        }}
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
