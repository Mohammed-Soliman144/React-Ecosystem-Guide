// By using Regular Variables
// export const Counter = () => {
//     console.log("The Counter Component Render")
//     let counter = 0;
//     const handleClick = () => {
//         counter = counter + 1;
//     }
//     return <button type="button" onClick={handleClick}>{counter}</button>
// }


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


