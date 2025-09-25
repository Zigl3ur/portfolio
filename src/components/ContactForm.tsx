import Input from "./ui/Input";
import TextArea from "./ui/TextArea";
import { z } from "zod/mini";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange"
  });

  const [submitError, setSubmitError] = useState<string>("");

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
        setSubmitError("Successfully send message !");
      } else if (response.status === 429) {
        setSubmitError("Too much messages send, try again later.");
      }
    } catch {
      setSubmitError("Failed to send message, try again later.");
    }
  };

  return (
    <form className="mx-auto max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="xs:flex-row flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Name"
            label="Name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            type="email"
            placeholder="Email"
            label="Email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <Input
          type="text"
          placeholder="Subject"
          label="Subject"
          error={errors.subject?.message}
          {...register("subject")}
        />
        <TextArea
          placeholder="Message"
          maxChars={messageMaxChars}
          error={errors.message?.message}
          label="Message"
          {...register("message")}
        />
      </div>
      {submitError && (
        <div className="text-destructive-muted hover:text-destructive flex justify-between text-sm">
          <span>{submitError}</span>
          <button
            onClick={() => setSubmitError("")}
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
        {isSubmitting ? "Sending Message..." : "Send Message"}
      </button>
    </form>
  );
}
