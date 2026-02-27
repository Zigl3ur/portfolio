import {
  Field,
  type FieldControlProps as BaseFieldControlProps,
  type FieldErrorProps as BaseFieldErrorProps,
  type FieldRootProps as BaseFieldRootProps
} from "@base-ui/react/field";
import { useState } from "react";

const inputStyle =
  "peer bg-background data-invalid:placeholder:text-destructive-muted data-invalid:border-destructive-muted data-invalid:focus:border-destructive data-invalid:focus:placeholder:text-destructive placeholder:text-muted border-muted focus:border-gray focus:placeholder:text-gray w-full rounded-md border-2 px-2 py-1 transition-colors duration-200 focus:outline-0";

export function FieldRoot({ ...props }: BaseFieldRootProps) {
  return (
    <Field.Root className="flex w-full flex-col gap-2" {...props}>
      {props.children}
    </Field.Root>
  );
}

export function FieldControl({ ...props }: BaseFieldControlProps) {
  return <Field.Control className={inputStyle} {...props} />;
}

export function FieldError({ ...props }: BaseFieldErrorProps) {
  return (
    <Field.Error
      className="text-destructive-muted peer-focus:text-destructive text-sm"
      {...props}
    />
  );
}

interface FieldTextAreaProps extends BaseFieldControlProps {
  maxChars: number;
}

export function FieldTextArea({ maxChars, ...props }: FieldTextAreaProps) {
  const [charCount, setCharCount] = useState<number>(0);

  return (
    <>
      <Field.Control
        render={<textarea rows={5} className={`min-h-33 ${inputStyle}`} />}
        {...props}
        onValueChange={(e, evt) => {
          if (props.onValueChange) props.onValueChange(e, evt);
          setCharCount(e.replace(/\s+/g, "").length);
        }}
      />
      <div className="peer-data-invalid:text-destructive-muted peer-focus:peer-data-invalid:text-destructive flex text-sm">
        {props.children}
        <Field.Description className="ml-auto shrink-0">
          {charCount}/{maxChars}
        </Field.Description>
      </div>
    </>
  );
}
