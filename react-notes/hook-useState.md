# What is useState Hook?
1. useState is a special function used to handle local states and datatype of state is number, string or boolean (simple states only).
2. useState syntax:
```js
    // A- import statement
    import {useState} from "react"
    // B- destructuring state variable and setter function and initial value of useState function
    const initialValue = "";
    const [state, setState] = useState<datatypeInterface>(initialValue);
    // C- initialValue of state divide into two categories:
        // C1- direct initialization for simple computation and calculation
        const [count, setCount] = useState(10)
        // C2- lazy initialization for heavy computation like fetch data from api or get data from local storage
        const [data, setData] = useState(() => {
            if(window === undefined) return "";
            return localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : "";
        })
    // D- setter function that destructuring from useState must has rules of name convention => starts by setFunctionName

```
3. useState with number, string and boolean:
```js
// By using states - useState with number
import {useState} from "react"

export const Counter = () => {
    const [count, setCount] = useState(0);
    return <button type="button" onClick={() => setCount(prev => prev + 1)}>Count: {count}</button>
} 


// By using States - useState with boolean and string
export const UserInfo = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [message, setMessage] = useState("");

    const handleClick = () => {
        setIsLogin(prev => !prev);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMessage(e.target.value);
    }
    return (
        <div className="container">
            <Counter />
            <button type="button" onClick={handleClick}>{isLogin? "Login" : "Logout"}</button>
            <input type="text" onChange={handleChange} />
            <p>{message}</p>
        </div>
    )
}
```
