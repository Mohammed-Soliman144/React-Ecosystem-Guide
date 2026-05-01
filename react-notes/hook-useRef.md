# What is useRef Hook in React?
1. useRef is presisting values of states between renders but also not triggers react rerender.
2. useRef is imperative to enable react deals with some operations must be imperative (not declarative as react) such below uses: 
   1. DOM Elements Manipulation. (document.selectElementById("input").focuse === inputRef.current.focus() === imperative) - exception can access direct to all DOM elements by useRef except window and document must use useEffect.
   2. Control of Timers behaviors with setInterval and setTimeout.
   3. Integration with third party libraries that not adapts with react ecosysmtem like d3.js google maps.
   4. useRef for compare the previous value of state or props that keep it inside useRef with the current value (new value of next render) which can access to previous value of state outside the setter function inside setState with useState and reducer with useReducer.
   5. Schedule to summarizes all real uses of useRef:
        ------------------------------
        | Example | useRef real uses |
        |---------|------------------|
        | DOM Manipulation |  document.getElementById("input").focus() === inputRef.current.focus() |
        | Control Timer Behaviors | clearInterval for setInterval - clearTimeout for setTimeout Browser API |
        | Handle HTTP Request and Response Timeout | useRef with AbortController to stop response if delays |
        | WebSocket and SubScriptions | useRef to handle WebSocket and tells server does not need to send data from server to browser |
        | handle Third Libraries | useRef for google maps or d3.js does not adapts with react ecosystem |
        | Compare previous State value with new one outside scope of setter function or reducer | useRef can access to previous value of state ouside scope of setter function with useState and reducer for useReducer |
        | Exception | Can direct access to whole DOM Elements by using useRef except window and document must access to both by using useEffect |
        ------------------------------
    
3. useRef return an object of the html element contains key called current to all js methods that supports with the type of html element (button, input, div etc.)
4. useRef vs useState and useReducer
   ---------------------------------------------------------------------------
   |Feature | useRef | useState && useReducer |
   |--------|--------|------------------------|
   | Presist value of states between renders | Yes | Yes |
   | Triggers React Render | No | Yes |
   | Sync and Async | syncrohous operation (instant) | asyncrohous (scheduled in less than 16 mileseconds) |
   | Behavior | Escape Hatch from React - useRef is imperative | Declarative |
   ---------------------------------------------------------------------------
5. useRef syntax:
```js
import {useRef} from "react"
export const ComponentOne = () => {
    // const nameRef = useRef<HTMLNameElement>(initialValue) - best practice null as initial for useRef
    const inputRef = useRef<HMTLInputElement>(null);
}
```
## Example of Foucs Input at first Mount:
```js
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
```

## Exmaple with Timers:
```js
import {useState, useRef, useEffect} from "react"

export const TimerComponent = () => {
    const [timer, setTimer] = useState<number>(0)
    const timerRef = useRef<number>(null)

    const handleStart = () => {
        // check if there a timer already works before starts new one
        if(timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => setTimer(prev => prev + 1), 1000)
    }

    const handleStop = () => {
        if(!timerRef.current) return
        clearInterval(timerRef.current)
    }
    // best practice for performance
    // runs only once when unmounting phase
    useEffect(() => {
        // which is setInterval is a browser API so when component destroyed or unmount the timerRef is destroyed already but the setInterval still works in browser take memory space from browser so must destoryed by using cleanup function
        return () => {
            if(timerRef.current) clearInterval(timerRef.current)
        }
    }, [])

    return <div className="container bg-amber-100 h-20 flex flex-col items-center justify-center">
        <h2 className="text-5xl font-extrabold grow text-black">{timer}</h2>
        <div className="">
            <button className="outline-none p-3 text-base font-bold bg-black text-white m-2 rounded-md ring-2 ring-amber-500" type="button" onClick={handleStart}>Start</button>
        <button className="outline-none p-3 text-base font-bold bg-black text-white m-2 rounded-md ring-2 ring-amber-500" type="button" onClick={handleStop}>Stop</button>
        </div>
    </div>
}
```