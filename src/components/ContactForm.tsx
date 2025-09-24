import Input from "./ui/Input";
import TextArea from "./ui/TextArea";
import { z } from "zod/mini";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const onSubmit: SubmitHandler<ContactFormSchemaType> = async (data) => {
    console.log(data);
    console.log(errors);
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
        <TextArea
          placeholder="Message"
          maxChars={messageMaxChars}
          error={errors.message?.message}
          label="Message"
          {...register("message")}
        />
      </div>
      <div className="flex w-full justify-end">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="bg-lime-bright text-gray hover:bg-lime-pale disabled:bg-muted rounded-md px-2 py-1 text-sm font-semibold transition-colors duration-200 hover:cursor-pointer disabled:cursor-default"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
