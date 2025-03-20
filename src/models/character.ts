import { minLength, object, pipe, string, type InferInput } from "valibot";

export const CharacterSchema = object({
    name: pipe(string(), minLength(2)),
    lastName: pipe(string(), minLength(4))
});

export type Character = InferInput<typeof CharacterSchema> & {id: number}