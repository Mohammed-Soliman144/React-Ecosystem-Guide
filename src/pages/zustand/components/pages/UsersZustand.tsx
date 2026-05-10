import { useState } from "react"
import { useUsersStore, type TUser } from "../../stores/usersStore"


export const UsersZustand = () => {
    const [state, setState] = useState<TUser>(() => ({id: 2, username: "", password: "", email: ""}))
    const [id, setId] = useState(0)
    const users = useUsersStore((state) => state.users)
    const addUser =useUsersStore((state) => state.actions.addUser)
    const removeUser =useUsersStore((state) => state.actions.removeUser)
    const updateUser =useUsersStore((state) => state.actions.updateUser)
    const summaryUsers = useUsersStore(state=> state.actions.summaryUsers)
    return <div className="container">
        <form action="" noValidate>
            <div className="form-controls">
                <label htmlFor="id">id:</label>
                <input type="text" disabled id="id" value={state.id} onChange={(e) => {
                    setState(prev => ({...prev, id: parseInt(e.target.value)}))
                }}/>
            </div>
            <div className="form-controls">
                <label htmlFor="username">username:</label>
                <input type="text" id="username" value={state?.username} onChange={(e) => setState(prev => ({...prev, username: e.target.value})) }/>
            </div>
            <div className="form-controls">
                <label htmlFor="password">password:</label>
                <input type="password" id="password" value={state?.password} onChange={(e) => setState(prev => ({...prev, password: e.target.value})) }/>
            </div>
            <div className="form-controls">
                <label htmlFor="email">email:</label>
                <input type="email" id="email" value={state?.email} onChange={(e) => setState(prev => ({...prev, email: e.target.value})) }/>
            </div>
            <div className="form-controls">
                <label htmlFor="userId">Id</label>
                <select name="userId" id="userId" onChange={(e) => {
                    if(e.currentTarget.value === "Select User ID") {
                        setState(prev => ({...prev, id: (users.findLast(us => us)?.id ?? 0) + 1 , username: "", password: "", email: ""}))
                        // console.log(e.currentTarget.value)
                        return;
                    }
                    const user = users.find(us => us.id === parseInt(e.currentTarget.value))
                    // console.log(user, e.currentTarget.value, users)
                    setId(parseInt(e.currentTarget.value))
                    setState(prev => ({...prev, ...user}))
                }} >
                    <option value="Select User ID" selected>Select User ID</option>
                    {
                        users.map(us => (
                            <option value={us.id} key={us.id}>{us.id}</option>
                        ))
                    }
                </select>
                <button type="button" className="block" onClick={(e)=> {
                    e.preventDefault()
                    removeUser(id)
                    setState(prev => ({...prev, id: (users.findLast(us => us)?.id ?? 0) + 1, username: "", password: "", email: ""}))
                }}>Remove user</button>
                <button type="button" className="block" onClick={(e)=> {
                    e.preventDefault()
                    const modifedUser = {
                        ...state,
                        username: state.username, password: state.password
                    }
                    setState(prev => ({...prev, username: state.username, password: state.password}))
                    updateUser(modifedUser)
                }}>Update user</button>
                <button className="block" type="button" onClick={(e) => {
                    e.preventDefault()
                    console.log(summaryUsers())
                }}>Summary</button>
            </div>
            <div className="form-buttons">
                <button type="button" onClick={(e) => {
                    e.preventDefault();
                    addUser(state)
                    setState(prev => ({...prev, id: (users.findLast(us => us)?.id ?? 0) + 1, username: "", password: "", email: ""}))
                }}>Add New User</button>
            </div>
        </form>
        <ul>
            {
                users.map(us => (
                    <li key={us.id}>
                        <h2>{us.username}</h2>
                        <p>{us.email}</p>
                        <p>{us.password}</p>
                    </li>
                ))
            }
        </ul>
    </div>
}