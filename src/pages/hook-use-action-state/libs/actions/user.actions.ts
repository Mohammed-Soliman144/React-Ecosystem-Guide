"use server"
import * as z from "zod"
import { createNewUser, checkUserExist } from "../../services/user.service"

// Runtime Validation by Zod library within app runs
const formSchema = z.object({
    username: z.string().min(2, "minimum length is 2 characters").max(30, "max length is 30 characters"),
    email: z.string().email(),
    password: z.string()
    .regex(/[A-Z]{1,}/,"must contain upper letters")
    .regex(/[a-z]{1,}/,"must contain lower letters")
    .regex(/[~!@#$%^&*]{1,}/,"must contain special characters ~!@#$%^&*"),
    confirm: z.string(),
}).refine(data => data.password === data.confirm, {
    error: "password and confirm must be match",
    path: ["confirm"]
}).superRefine((data, ctx) => {
    if(data?.email?.endsWith("@info.com")) {
        ctx.addIssue({
            code: "custom",
            message: "email must not include @info.com",
            path: ["email"]
        })
    }
})

type schemaType = z.infer<typeof formSchema>

export type formType = {
    success?: boolean,
    message?: string,
    errors?: Record<string, string[]>,
    formData?: Partial<schemaType>
}


export const formState: formType = {
    success: undefined,
    message: "",
    errors: undefined,
    formData: undefined
} 

export async function handleAction(formState, formData: FormData): Promise<formType> {
    await new Promise(resolve => setTimeout(resolve, 2000))
    // 1- Extract all Data from form
    const rawData = Object.fromEntries(formData)
    // 2- Validate Data at runtime by Zod
    const result = formSchema.safeParse(rawData);

    // Catch errors within validation at runtime
    if(!result.success) {
        console.log(result.error)
        return {
            success: result.success,
            message: "Something went wrong",
            errors: result.error.issues.reduce((acc, iss) => {
                const path = iss.path.join(".")
                if(acc[path] === undefined)
                    acc[path] = []
                acc[path].push(iss.message)
                return acc
            }, {} as Record<string, string[]>),
            formData: result.data,
        }
    }

    // Check if User Exist:
    // JSON.strinify(rawData) => return formData as JS Object Notation {"key": "value"}
    // JSON.parse(JSON.strinify(rawData)) => return formData as JS object {key: value}
    const userData = JSON.parse(JSON.stringify(rawData))
    const {success, message} = checkUserExist(userData)
    if(!success) {
        if(message !== "username is not exist") 
            return {
                success,
                message,

            }
        const result = createNewUser(userData)
        return {
            ...result
        }
    } 
    return {
        success,
        message,
        formData: userData,
    }
}


function flatErrors(errors: Array<z.ZodIssue>) {
    const flatten = errors.reduce((acc, err) => {
        const path = err.path.join('.')
        if(acc[path] === undefined)
            acc[path] = []
        acc[path].push(err.message)
        return acc
    }, {} as Record<string, string[]>)
    return flatten;
}