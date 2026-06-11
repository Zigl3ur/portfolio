import { z } from "zod/mini";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import type { LangProps } from "../types";
import { Field } from "@base-ui/react";
import { Form } from "@base-ui/react/form";
import { FieldControl, FieldError, FieldRoot, FieldTextArea } from "./ui/Field";
import Alert, { type AlertVariant } from "./ui/Alert";
import { useMutation } from "../hooks/useFetch";

const messageMaxChars: number = 1500;

export default function ContactForm({ t }: LangProps<"contact">) {
  const ft = t.form;

  const contactFormSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .check(
            z.minLength(2, { error: ft.fields.name.errors.min }),
            z.maxLength(15, { error: ft.fields.name.errors.max }),
            z.trim()
          ),
        email: z.string().check(z.email({ error: ft.fields.email.error })),
        subject: z.string().check(
          z.refine((val) => val.replace(/\s/g, "").length >= 5, {
            error: ft.fields.subject.errors.min
          }),
          z.refine((val) => val.replace(/\s/g, "").length <= 100, {
            error: ft.fields.subject.errors.max
          }),
          z.trim()
        ),
        message: z.string().check(
          z.refine((val) => val.replace(/\s/g, "").length >= 10, {
            error: ft.fields.message.errors.min
          }),
          z.refine((val) => val.replace(/\s/g, "").length <= messageMaxChars, {
            error: ft.fields.message.errors.max
          }),
          z.trim()
        )
      }),
    [ft]
  );

  type ContactFormSchemaType = z.infer<typeof contactFormSchema>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid }
  } = useForm<ContactFormSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    },
    resolver: zodResolver(contactFormSchema),
    mode: "onChange"
  });

  const { mutate, error, status } = useMutation("/api/message");

  const [submitMessage, setSubmitMessage] = useState<{
    type: AlertVariant;
    message: string;
  }>({ type: "error", message: "" });

  useEffect(() => {
    if (submitMessage.message) {
      const timeoutId = setTimeout(
        () => setSubmitMessage({ type: "error", message: "" }),
        4_000
      );

      return () => clearTimeout(timeoutId);
    }
  }, [submitMessage.message]);

  const onSubmit: SubmitHandler<ContactFormSchemaType> = async (data) => {
    await mutate(data);

    if (error) {
      setSubmitMessage({ type: "error", message: ft.submitMessages.error });
    }
    if (status === 429) {
      setSubmitMessage({ type: "error", message: ft.submitMessages.rateLimit });
    } else {
      setSubmitMessage({
        type: "success",
        message: ft.submitMessages.ok
      });
      reset();
    }
  };

  return (
    <Form className="mx-auto max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="xs:flex-row flex flex-col gap-2">
          <Controller
            name="name"
            control={control}
            render={({
              field: { ref, name, value, onBlur, onChange },
              fieldState: { invalid, isTouched, isDirty, error }
            }) => (
              <FieldRoot
                name={name}
                invalid={invalid}
                touched={isTouched}
                dirty={isDirty}
              >
                <Field.Label htmlFor="contact-name">
                  {ft.fields.name.label}
                </Field.Label>
                <FieldControl
                  id="contact-name"
                  ref={ref}
                  value={value}
                  onBlur={onBlur}
                  onValueChange={onChange}
                  placeholder={ft.fields.name.placeholder}
                />
                <FieldError match={!!error}>{error?.message}</FieldError>
              </FieldRoot>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({
              field: { ref, name, value, onBlur, onChange },
              fieldState: { invalid, isTouched, isDirty, error }
            }) => (
              <FieldRoot
                name={name}
                invalid={invalid}
                touched={isTouched}
                dirty={isDirty}
              >
                <Field.Label htmlFor="contact-email">
                  {ft.fields.email.label}
                </Field.Label>
                <FieldControl
                  id="contact-email"
                  ref={ref}
                  value={value}
                  onBlur={onBlur}
                  onValueChange={onChange}
                  placeholder={ft.fields.email.placeholder}
                />
                <FieldError match={!!error}>{error?.message}</FieldError>
              </FieldRoot>
            )}
          />
        </div>

        <Controller
          name="subject"
          control={control}
          render={({
            field: { ref, name, value, onBlur, onChange },
            fieldState: { invalid, isTouched, isDirty, error }
          }) => (
            <FieldRoot
              name={name}
              invalid={invalid}
              touched={isTouched}
              dirty={isDirty}
            >
              <Field.Label htmlFor="contact-subject">
                {ft.fields.subject.label}
              </Field.Label>
              <FieldControl
                id="contact-subject"
                ref={ref}
                value={value}
                onBlur={onBlur}
                onValueChange={onChange}
                placeholder={ft.fields.subject.placeholder}
              />
              <FieldError match={!!error}>{error?.message}</FieldError>
            </FieldRoot>
          )}
        />

        <Controller
          name="message"
          control={control}
          render={({
            field: { ref, name, value, onBlur, onChange },
            fieldState: { invalid, isTouched, isDirty, error }
          }) => (
            <FieldRoot
              name={name}
              invalid={invalid}
              touched={isTouched}
              dirty={isDirty}
            >
              <Field.Label htmlFor="contact-message">
                {ft.fields.message.label}
              </Field.Label>
              <FieldTextArea
                id="contact-message"
                ref={ref}
                value={value}
                onBlur={onBlur}
                onValueChange={onChange}
                placeholder={ft.fields.message.placeholder}
                maxChars={messageMaxChars}
              >
                <Field.Error match={!!error}>{error?.message}</Field.Error>
              </FieldTextArea>
            </FieldRoot>
          )}
        />
        {submitMessage.message && (
          <Alert
            variant={submitMessage.type}
            onClose={() => setSubmitMessage({ type: "error", message: "" })}
          >
            <span>{submitMessage.message}</span>
          </Alert>
        )}
      </div>
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="bg-lime-bright text-gray hover:bg-lime-pale disabled:bg-muted mt-4 w-full p-2 text-sm font-semibold transition-colors duration-200 hover:cursor-pointer disabled:cursor-default"
      >
        {isSubmitting ? ft.submitButton.submitting : ft.submitButton.base}
      </button>
    </Form>
  );
}
