import {useState} from "react"


export const CounterWithoutPrev = () => {
    const [count, setCount] = useState(() => {
        console.log("Count at Mounting Phase => initial", count);
        return 0
    })
    console.log("Count at Rendering Phase => initial", count);

    const handleClick = () => {
        console.log("the count before setter function", count);
        setCount(count + 1);
        console.log("the count after setter function => snapshot phase", count);
        setCount(count + 1);
        console.log("the count after setter function => snapshot phase", count);
        setCount(count + 1);
        console.log("the count after setter function => snapshot phase", count);
    }

    return <button type="button" onClick={handleClick}>
        Count: {count}
    </button>
}


export const CounterWithPrev = () => {
    // Lazy initialization
    const [count, setCount] = useState(() => {
        console.log("Count at Mounting Phase => initial", 0);
        return 0
    })
    const [login, setLogin] = useState(false)
    const [name, setName] = useState("");

    console.log("Count at Rendering Phase => initial", count);

    const handleClick = () => {
        console.log("the count before setter function", count);

        setCount(prev => {
            console.log("the count after setter function", prev)
            return prev + 10;
        });

        setCount(prev => {
            console.log("the count after setter function", prev)
            return prev + 6;
        });

        setCount(prev => {
            console.log("the count after setter function", prev)
            return prev + 20;
        });


        setLogin(prev => {
            console.log("the login after setter function", prev)
            return !prev;
        });

        setName(prev => {
            console.log("the name after setter function", prev)
            return "Muhammad Soliman";
        })

        console.log("React Batching Phase Does not rerender 5 times which 3 times for count state, 1 for name state and 1 for login state => but only Batching all updates then snapshot then rendering then one commit to update Actual DOM")
    }

    return <div className="container">
        <h2>{count}</h2>
        <p>{login? "Login" : "Logout"}</p>
        <p>{name}</p>
        <button type="button" onClick={handleClick}>
            Update all States
        </button>
    </div>
}



