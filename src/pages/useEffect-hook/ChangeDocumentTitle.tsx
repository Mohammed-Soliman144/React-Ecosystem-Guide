import {useEffect, useState} from "react"

export const ChangeDocumentTitle = () => {
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(prev => prev + 1)
    }
    useEffect(()=> {
        // here can access directly to document and window by useEffect
        // useEffect runs after each change in count
        document.title = `count val ${count}`
        // cleanup function which React do actually handle removeEventListener click from event automatically (which its inside react ecosystem)
    },[count])
    return <button type="button" onClick={handleClick}>Count: {count}</button>
}

