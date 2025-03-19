import { compare, hash } from "bcrypt";
import { email, minLength, object, pipe, string, type InferInput } from "valibot";

const emailSchema = pipe(string(), email());
const passwordSchema = pipe(string(), minLength(6));

export const authSchema = object({
    email: emailSchema,
    password: passwordSchema
})

export enum Role {
    "ADMIN" = "admin",
    "USER" = "user"
}

export type User = InferInput<typeof authSchema> & {
    id: number;
    role: Role;
    refreshToken?: string;
}

const users: Map<string, User> = new Map();

/**
 * Create a new user with given email and password
 * The password is hashed before storing
 * 
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @returns {Promise<User>} - Create user
 */
export const createUser = async (
    email: string,
    password: string
): Promise<User> => {
    const hashPassword = await hash(password, 10);

    const newUser: User = {
        id: Date.now(),
        email,
        password: hashPassword,
        role: Role.USER
    }
    users.set(email, newUser);
    return newUser
}

/**
 * Finds a new user by their given email.
 * @param {string} - email - email of the user to find.
 * @return {User| undefined} - Return user if found, oherwise undefine
 */
export const findUserbyEmail = (email: string): User | undefined => {
    return users.get(email)
}


/**
 * Validate a user password
 * @param {User} user - User whose password is to be validate
 * @param {string} password - Password to validate
 * @returns {Promise<boolean>} - True if the password is valid, otherwise false.
 */
export const validatePasswor = async (
    user: User,
    password: string
): Promise<boolean> =>{
    return compare(password, user.password);
}

/**
 * Revoke token
 * @param {string} email - Email of the user to revoke the token
 * @return {boolean} - True if the token is revoked, otherwise false.
 */
export const revokeUserToken = (email:string): boolean =>{
    const foundUser =  users.get(email);
    if(!foundUser){
        return false;
    }
    users.set(email,{...foundUser, refreshToken: undefined});
    return true;
}