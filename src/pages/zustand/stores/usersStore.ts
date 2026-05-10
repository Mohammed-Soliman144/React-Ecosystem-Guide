import {create} from 'zustand'


export type TUser = {
    id: number,
    username: string,
    password: string,
    email: string
}
interface IUsers {
    users: Array<TUser>,
    actions: {
        addUser: (newUser: TUser) => void,
        removeUser: (id: number) => void,
        updateUser: (modifyUser: Omit<TUser, 'email'>) => void,
        summaryUsers: () => string
    }
}

export const useUsersStore = create<IUsers>((set, get)=> ({
    users: [{id: 1, username: "mohammed", password: "1212ms", email: "m.saied@gmail.com"}],
    actions: {
        addUser: (newUser) => set(state => ({users: [...state.users, newUser]})),
        removeUser: (id)=> set(state => ({users: state.users.filter(us => us.id !== id)})),
        updateUser: (newUser) => set(state => ({users: state.users.map(us => us.id === newUser.id? {...us, username: newUser.username, password: newUser.password} : us)})),
        summaryUsers: () => (`Total users ${get().users.length}`)
    }
}))
