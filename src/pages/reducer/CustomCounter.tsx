import {useReducer} from "react"


export const CustomCounter = () => {
    
    const [count, setCount] = useState(0);
    const [data, setData] = useState(()=> {
        console.log("lazy initialization");
        return Array(30).fill(0);
    })
    return <div className="container">
        <h2>{count}</h2>
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
        <button type="button" onClick={() => setCount(count - 1)}>-</button>
        <button type="button" onClick={() => setCount(0)}>Reset</button>
        <button type="button" onClick={() => setCount((prev) => prev + 1)}>Increment Value with previous callback function</button>
        <button type="button" onClick={() => setCount((prev) => prev - 1)}>Decrement Value with previous callback function</button>
    </div>
}