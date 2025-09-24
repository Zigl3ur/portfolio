import { useState, type FormEvent } from "react";
import Input from "./ui/Input";
import TextArea from "./ui/TextArea";
import type { ContactFormData, ContactFormErrors } from "../types";
import * as z from "zod/mini";

const messageMaxChars: number = 1500;

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });
  const [formDataErrors, setFormDataErrors] = useState<ContactFormErrors>({
    name: [],
    email: [],
    message: []
  });

  const [pending, setPending] = useState<boolean>(false);

  const contactFormSchema = z.object({
    name: z
      .string()
      .check(
        z.minLength(2, { error: "Name must be at least 2 char" }),
        z.maxLength(15, { error: "Name must be at most 15 char" }),
        z.trim()
      ),
    email: z.string().check(z.email({ error: "Email is invalid" })),
    message: z.string().check(
      z.minLength(10, { error: "Message must be at least 10 char" }),
      z.maxLength(messageMaxChars, {
        error: "Message must be at most 1500 char"
      }),
      z.trim()
    )
  });

  const validateFields = (data: ContactFormData): boolean => {
    const result = contactFormSchema.safeParse(data);

    if (!result.success) {
      const { error } = result;
      const newErrors: ContactFormErrors = { name: [], email: [], message: [] };

      error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormErrors;
        newErrors[field].push(issue.message);
      });

      setFormDataErrors(newErrors);
      return false;
    }
    setFormDataErrors({ name: [], email: [], message: [] });
    return true;
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      validateFields(updated);
      return updated;
    });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    validateFields(formData);
    setPending(true);
    e.preventDefault();
  };

  return (
    <form className="mx-auto max-w-xl" onSubmit={submit}>
      <div className="space-y-4">
        <div className="xs:flex-row flex flex-col gap-2">
          <Input
            placeholder="Name"
            label="Name"
            errors={formDataErrors.name}
            value={formData.name}
            onChange={(value) => {
              handleChange("name", value);
            }}
          />
          <Input
            placeholder="Email"
            label="Email"
            errors={formDataErrors.email}
            value={formData.email}
            onChange={(value) => {
              handleChange("email", value);
            }}
          />
        </div>
        <TextArea
          placeholder="Message"
          maxChars={messageMaxChars}
          label="Message"
          errors={formDataErrors.message}
          value={formData.message}
          onChange={(value) => {
            handleChange("message", value);
          }}
        />
      </div>
      <div className="flex w-full justify-end">
        <button
          type="submit"
          disabled={pending}
          className="bg-lime-bright text-gray hover:bg-lime-pale disabled:bg-lime-bright/60 rounded-md px-2 py-1 text-sm font-semibold transition-colors duration-200 hover:cursor-pointer disabled:hover:cursor-wait"
        >
          {pending ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
