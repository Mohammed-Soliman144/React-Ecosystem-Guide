import * as z from "zod"

export const formSchema = z.object({
    id: z.string(),
    title: z.string().min(3, {
        error: "mimimum length is 3 characters",
    }).max(15, {
        error: "maximum length is 15 characters"
    })
})

export type formType = z.infer<typeof formSchema>


export type taskType = {
    id?: string,
    title?: string,
}

export type state = {
    success?: boolean,
    message?: string,
    errors?: Record<string, string[]>,
    data?:formType
}

export type initialType = Array<taskType>
export type actionType = {type: "ADD_TASK", payload: taskType} | {type: "ROLLBACK", payload: string}