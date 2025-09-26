import Input from "./ui/Input";
import TextArea from "./ui/TextArea";
import { z } from "zod/mini";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import type { LangProps } from "../types";

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
        subject: z
          .string()
          .check(
            z.minLength(5, { error: ft.fields.subject.errors.min }),
            z.maxLength(100, { error: ft.fields.subject.errors.max }),
            z.trim()
          ),
        message: z.string().check(
          z.minLength(10, { error: ft.fields.message.errors.min }),
          z.maxLength(messageMaxChars, {
            error: ft.fields.subject.errors.max
          }),
          z.trim()
        )
      }),
    [ft]
  );

  type ContactFormSchemaType = z.infer<typeof contactFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange"
  });

  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    message: string;
  }>({ type: "error", message: "" });

  const onSubmit: SubmitHandler<ContactFormSchemaType> = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/message`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          message: ft.submitMessages.ok
        });
      } else if (response.status === 429) {
        setSubmitMessage({
          type: "error",
          message: ft.submitMessages.rateLimit
        });
      } else {
        setSubmitMessage({
          type: "error",
          message: ft.submitMessages.error
        });
      }
    } catch {
      setSubmitMessage({
        type: "success",
        message: ft.submitMessages.error
      });
    }
  };

  return (
    <form className="mx-auto max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="xs:flex-row flex flex-col gap-2">
          <Input
            type="text"
            placeholder={ft.fields.name.placeholder}
            label={ft.fields.name.label}
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            type="email"
            placeholder={ft.fields.email.placeholder}
            label={ft.fields.email.label}
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <Input
          type="text"
          placeholder={ft.fields.subject.placeholder}
          label={ft.fields.subject.label}
          error={errors.subject?.message}
          {...register("subject")}
        />
        <TextArea
          placeholder={ft.fields.message.placeholder}
          label={ft.fields.message.label}
          maxChars={messageMaxChars}
          error={errors.message?.message}
          {...register("message")}
        />
      </div>
      {submitMessage.message && (
        <div
          className={`flex justify-between text-sm ${submitMessage.type === "error" ? "text-destructive-muted hover:text-destructive" : "text-lime-pale/80 hover:text-lime-bright"}`}
        >
          <span>{submitMessage.message}</span>
          <button
            onClick={() => setSubmitMessage({ type: "error", message: "" })}
            className="hover:cursor-pointer hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="bg-lime-bright text-gray hover:bg-lime-pale disabled:bg-muted mt-2 w-full rounded-md px-2 py-1 text-sm font-semibold transition-colors duration-200 hover:cursor-pointer disabled:cursor-default"
      >
        {isSubmitting ? ft.submitButton.submitting : ft.submitButton.base}
      </button>
    </form>
  );
}
