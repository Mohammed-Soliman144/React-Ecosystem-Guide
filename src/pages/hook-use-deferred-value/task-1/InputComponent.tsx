/* Example 1: Search with Instant Input Feedback (E-commerce)
Scenario: User types search term - input updates instantly, but filtering happens on deferred value. */

import {useState, useDeferredValue} from "react"

export const InputComponent = () => {
    const [input, setInput] = useState("")
    const deferredInput = useDeferredInput(input)

    return <input type="text" name="input" value={input} onChange={(e) => setInput(e.target.value)} />
}