import { email, minLength, object, pipe, string, type InferInput } from "valibot";

const emailSchema = pipe(string(), email());
const passwordSchema = pipe(string(), minLength(6));

export const authSchema = object({
    email: emailSchema,
    password: passwordSchema
})

export type User = InferInput<typeof authSchema>