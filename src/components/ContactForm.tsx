import { useState } from "react";
import Input from "./ui/Input";

export default function ContactForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <div className="mx-auto max-w-xl">
      <div className="xs:flex-row flex flex-col gap-2">
        <Input
          placeholder="Name"
          inputLabel="Name"
          value={name}
          onChange={setName}
        />
        <Input
          placeholder="Email"
          inputLabel="Email"
          value={email}
          onChange={setEmail}
        />
      </div>
    </div>
  );
}
