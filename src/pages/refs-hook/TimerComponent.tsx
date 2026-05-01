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