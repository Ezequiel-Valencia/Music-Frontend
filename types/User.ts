
import { z } from "zod"
import { alphaNumericRegex, anRegexWithExtraChars } from "../utils/config"

export const userSchema = z.object({
    Username: z.string().min(4).max(20).regex(alphaNumericRegex),
    CreationDate: z.string().min(2),
    Role: z.string().min(2)
})

export const loginFormSchema = z.object({
    email: z.string().email(),

    password: z.string()
    .min(8, "Password must have a minimum of 8 characters.")
    .max(20, "Password can have a max of 30 characters.")
    .regex(anRegexWithExtraChars, "Password must contain only numbers, letters, and the following character set: ()!@#$%^&*")
})

export const registerFormSchema = z.object({
    username: z.string()
    .min(4, "Username must have a minimum of 4 characters.")
    .max(20, "Username can have a max of 15 characters.")
    .regex(alphaNumericRegex, "Username must contain only letters and numbers."),

    email: z.string().email(),

    password: z.string()
    .min(8, "Password must have a minimum of 8 characters.")
    .max(20, "Password can have a max of 30 characters.")
    .regex(anRegexWithExtraChars, "Password must contain only numbers, letters, and the following character set: ()!@#$%^&*")
})

export type User = z.infer<typeof userSchema>


