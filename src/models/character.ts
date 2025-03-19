import { minLength, object, pipe, string } from "valibot";

export const CharacterSchema = object({
    name: pipe(string(), minLength(2)),
    lastName: pipe(string(), minLength(4))

})