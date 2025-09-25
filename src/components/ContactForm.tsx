import Input from "./ui/Input";
import TextArea from "./ui/TextArea";
import { z } from "zod/mini";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { LangProps } from "../types";

const messageMaxChars: number = 1500;

const contactFormSchema = z.object({
  name: z
    .string()
    .check(
      z.minLength(2, { error: "Name must be at least 2 char" }),
      z.maxLength(15, { error: "Name must be at most 15 char" }),
      z.trim()
    ),
  email: z.string().check(z.email({ error: "Email is invalid" })),
  subject: z
    .string()
    .check(
      z.minLength(5, { error: "Subject must be at least 5 char" }),
      z.maxLength(100, { error: "Name must be at most 100 char" }),
      z.trim()
    ),
  message: z.string().check(
    z.minLength(10, { error: "Message must be at least 10 char" }),
    z.maxLength(messageMaxChars, {
      error: "Message must be at most 1500 char"
    }),
    z.trim()
  )
});

type ContactFormSchemaType = z.infer<typeof contactFormSchema>;

export default function ContactForm({ t }: LangProps<"contact">) {
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
      const response = await fetch("http://localhost:8080/message", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          message: t.form.submitMessages.ok
        });
      } else if (response.status === 429) {
        setSubmitMessage({
          type: "error",
          message: t.form.submitMessages.rateLimit
        });
      }
    } catch {
      setSubmitMessage({
        type: "success",
        message: t.form.submitMessages.error
      });
    }
  };

  return (
    <form className="mx-auto max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="xs:flex-row flex flex-col gap-2">
          <Input
            type="text"
            placeholder={t.form.fields.name.placeholder}
            label={t.form.fields.name.label}
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            type="email"
            placeholder={t.form.fields.email.placeholder}
            label={t.form.fields.email.label}
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <Input
          type="text"
          placeholder={t.form.fields.subject.placeholder}
          label={t.form.fields.subject.label}
          error={errors.subject?.message}
          {...register("subject")}
        />
        <TextArea
          placeholder={t.form.fields.message.placeholder}
          label={t.form.fields.message.label}
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
        {isSubmitting
          ? t.form.submitButton.submitting
          : t.form.submitButton.base}
      </button>
    </form>
  );
}
