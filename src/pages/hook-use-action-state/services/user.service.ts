// Simulate Database and Server Actions

import { success } from "zod";

type userType = {
    username: string,
    email: string,
    password: string,
    confirm?: string
}
const UsersDB: Array<userType> = [
    {
        username: "mohamed123",
        password: "Mm@123",
        email: "mohamed@gmail.com"
    },
    {
        username: "ahmed456",
        password: "Aa@456",
        email: "ahmed@gmail.com"
    },
    {
        username: "sayed789",
        password: "Ss@789",
        email: "sayed@gmail.com"
    },
]

// export async function createNewUser(user: userType) all operation on database and server must be async but below for simulation
export function checkUserExist(userData: userType) {
    
    if(!UsersDB.some(user => user.username === userData.username)) 
        return {
            success: false,
            message: "username is not exist"
        }
    if(!UsersDB.some(user => user.password === userData.password))
        return {
            success: false,
            message: "password is invalid"
        }
    if(!UsersDB.some(user => user.email === userData.email))
        return {
            success: false,
            message: "email is invalid"
        }
    return {
        success: true,
        message: "You are login successfully!"
    }
}

// export async function createNewUser(user: userType) all operation on database and server must be async but below for simulation
export function createNewUser(user: userType) {
    // all server action and database operations are mutation can change successfully in the same container 
    if(UsersDB.some(u => u === user)) 
        return {
            success: false,
            message: `Your username ${user.username} is already exist and email ${user.email}`
        } 
    UsersDB.push(user)
    return {
        success: true,
        message: "User Saved Successfully! and you are login!"
    }
}
