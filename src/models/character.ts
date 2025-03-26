import { error } from "console";
import { minLength, object, pipe, string, type InferInput } from "valibot";

export const CharacterSchema = object({
    name: pipe(string(), minLength(2)),
    lastName: pipe(string(), minLength(4))
});

export type Character = InferInput<typeof CharacterSchema> & { id: number };

const characters: Map<number, Character> = new Map();

export const getAllCharacters = (): Character[] => {
    return Array.from(characters.values());
};

export const getCharacterById = (id: number): Character | undefined => {
    return characters.get(id);
};

export const addCharacter = (character: Character): Character => {
    const newCharacter = {
        ...character,
        id: new Date().getTime()
    }
    characters.set(newCharacter.id, newCharacter)
    return newCharacter;
};

export const updateCharacter = (id: number, updateCharacter: Character): Character | null => {
    if(!characters.has(id)){
        console.error('Charactar with id', id, 'not found')
        return null;
    }
    characters.set(id, updateCharacter);
    return updateCharacter;
};

export const deleteCharacter = (id: number): boolean =>{
    if(!characters.has(id)){
        console.error('Charactar with id', id, 'not found')
        return false;
    }
    characters.delete(id);
    return true
}