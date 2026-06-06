import {
  Field,
  type FieldControlProps as BaseFieldControlProps,
  type FieldErrorProps as BaseFieldErrorProps,
  type FieldRootProps as BaseFieldRootProps
} from "@base-ui/react/field";

const inputStyle =
  "peer bg-transparent data-invalid:placeholder:text-destructive-muted data-invalid:border-destructive-muted data-invalid:focus:border-destructive data-invalid:focus:placeholder:text-destructive placeholder:text-muted border-muted focus:border-lime-pale focus:placeholder:text-gray w-full border-2 px-2 py-1 transition-colors duration-200 focus:outline-0";

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
  const charCount = ((props.value as string) ?? "").replace(/\s+/g, "").length;

  return (
    <>
      <Field.Control
        render={<textarea rows={5} className={`min-h-33 ${inputStyle}`} />}
        {...props}
        // avoid error with cant pass children to text area
        children={undefined}
        onValueChange={(e, evt) => {
          if (props.onValueChange) props.onValueChange(e, evt);
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
