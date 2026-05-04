import {useDeferredValue, useMemo, useState, useCallback} from "react"
import { FormGrid } from "./FormGrid"
import { TableGrid } from "./TableGrid"

/* RULE
    ParentComponent = ManyJSXChildComponents + ManyFunctionalityChildComponent
    JSXChildComponent => for only one jsx that display one thing or one jsx that display many things but not repeated if repeated separate each one
    FunctionalityComponent => for only one Functionality that solve one task
*/

const usersTable = Array.from({length: 500}, (_, i) => {
    return {
        id: i + 1,
        username: `user-${i + 1}`,
        email: `user-${i + 1}@gmail.com`,
        role: ["ADMIN", "MODERATOR", "VISTOR"][i%3],
        joinDate: new Date(2025,i%11, i%30).toISOString(),
        isActive: ["ACTIVE", "IN-ACTIVE"][i%2]
    }
})

export const ParentGrid = () => {
    const [inputSearch, setInputSearch] = useState("")
    const deferredInputSearch = useDeferredValue(inputSearch)
    const deferredFilterUsers = useMemo(() => {
        if(!deferredInputSearch) return []
        const result = usersTable.filter(user => {
            return user.username.toLowerCase().includes(deferredInputSearch.toLowerCase()) 
            || user.email.toLowerCase().includes(deferredInputSearch.toLowerCase()) 
            || user.role.toLowerCase().includes(deferredInputSearch.toLowerCase()) 
            || user.isActive.toLowerCase().includes(deferredInputSearch.toLowerCase()) 
        })
        return result.length > 20 ? result.slice(0, 20) : result
    }, [deferredInputSearch])
    const isSearching = inputSearch !== deferredInputSearch

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputSearch(e.target.value)
    }, [])
    return <section className="bg-slate-700 p-3 m-3 rounded-xl border-2 border-white">
        <FormGrid inputSearch={inputSearch} handleChange={handleChange}/>
        <TableGrid deferredFilterUsers={deferredFilterUsers} isSearching={isSearching}/> 
    </section>
}