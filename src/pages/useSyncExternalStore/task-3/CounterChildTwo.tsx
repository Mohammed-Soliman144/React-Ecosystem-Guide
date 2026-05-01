import { useSyncExternalStore } from "react"
import { counterStore } from "./store/counterStore"

export const CounterChildTwo = () => {
    const snapshot = useSyncExternalStore(counterStore.subscribe.bind(counterStore), counterStore.getSnapshot.bind(counterStore), counterStore.getServerSnapshot.bind(counterStore))
    return <div className="container">
        <p className="text-blue-800 font-bold bg-black p-4">Counter = {snapshot}</p>
        <button type="button" onClick={() => counterStore.setState("INCREMENT")}>Increment</button>
        <button type="button" onClick={() => counterStore.setState("DECREMENT")}>DECREMENT</button>
        <button type="button" onClick={() => counterStore.setState("RESET")}>RESET</button>
    </div>
}