import {useRef, useEffect} from "react"

// Focus on Input at first load (mounting phase) 
export const InputFocus = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    // useEffect runs once at first mounting phase
    useEffect(() => {
        if(!inputRef.current) return
        inputRef.current.focus()
    }, [])
    return <form action="" method="GET">
        <label htmlFor="email">
            Email:
            <input type="email" id="email" ref={inputRef} placeholder="example@gmail.com"/>
        </label>
    </form>
}