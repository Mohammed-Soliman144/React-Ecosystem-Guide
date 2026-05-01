"use server"
import { createNewTask } from "../services/task.service"
import { formSchema, type state } from "../types/task-type"

const prevState: state = {
    success: undefined,
    message: undefined,
    errors: undefined,
    data: undefined
}

export async function handleAction(prevState, formData: FormData): Promise<state> {
    // get Form Data
    const rawData = Object.fromEntries(formData)
    // check input at runtime - zod validation
    const result = formSchema.safeParse(rawData)
    // Exit Early first
    if(!result.success) 
        return {
            success: result.success,
            message: "Your input is invalid",
            errors: result.error.issues.reduce((acc, err) => {
                const path = err.path[0] as string
                if(acc[path] === undefined)
                    acc[path] = []
                acc[path].push(err.message)
                return acc
            }, {} as Record<string,string[]>),
            data: result.data
        }
    // handle Create new Task on Database
    const {success, message} = await createNewTask(result.data)

    // Exit Early
    if(!success)
        return {
            success,
            message,
            errors: {db: ["Failed to add"]},
            data: result.data
        }

    return {
        success,
        message,
        data: result.data
    }
}