import {useSyncExternalStore} from "react"

type counterType = "INCREMENT" | "DECREMENT" | "RESET"
const storageStore = {
    state: typeof window !== "undefined" ? Number(JSON.parse(localStorage.getItem("hybirdCounter") ?? "0" as string)) : 0,
    listeners: new Set<() => void>(),
    setState(type: counterType) {
        switch(type) {
            case "INCREMENT":
                this.state++
                break;
            case "DECREMENT": 
                this.state = this.state > 0 ? --this.state : 0
                break;
            case "RESET":
                this.state = 0
        }
        localStorage.setItem("hybirdCounter", this.state.toString())
        this.notify()
    },
    notify() {
        this.listeners.forEach(listener =>  listener())
    },
    subscribe(handleStorage: () => void) {
        // Attach listener for set to react
        this.listeners.add(handleStorage)
        
        const handleStorageOtherTabs = (e: StorageEvent) => {
            if(e.key === "hybirdCounter") {
                this.state = Number(JSON.parse(e.newValue ?? "0" as string))
                this.notify() 
            }
        }
        // attach handleStorageOtherTabs to browser
        window.addEventListener("storage",handleStorageOtherTabs)

        return () => {
            this.listeners.delete(handleStorage)
            window.removeEventListener("storage", handleStorageOtherTabs)
        }
    },

    getSnapshot() {
        return this.state
    },

    getServerSnapshot() {
        return 0
    }
}

export const HybirdCounterComponent = () => {
    const snapshot = useSyncExternalStore(storageStore.subscribe.bind(storageStore), storageStore.getSnapshot.bind(storageStore), storageStore.getServerSnapshot.bind(storageStore))
    return <div className="contaner">
        <p className="bg-black text-white text-5xl font-extrabold p-5">{snapshot}</p>
        <button type="button" onClick={() => storageStore.setState("INCREMENT")}>INCREMENT</button>
        <button type="button" onClick={() => storageStore.setState("DECREMENT")}>DECREMENT</button>
        <button type="button" onClick={() => storageStore.setState("RESET")}>RESET</button>
    </div>
}