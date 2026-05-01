import { type taskType } from "../types/task-type"

export const tasksDB: Array<taskType> = []

export async function createNewTask(newTask: taskType) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    // check if exist
    const isDuplicated = tasksDB.some(task => task.title === newTask.title)
    if(isDuplicated) 
        return {
            success: false,
            message: "Your task is already exist!"
        }
    tasksDB.push(newTask)
    return {
        success: true,
        message: "Your task added successfully!",
    }
}