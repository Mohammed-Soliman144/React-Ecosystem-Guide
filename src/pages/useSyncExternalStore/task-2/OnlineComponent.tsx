import {useSyncExternalStore} from "react"

const onlineStore = {
    // also online and offline Event sent to browser automatically when the private property (boolean) navigator.online change to true trigger browser to attach event onchange addEventListener and otherwise when change to false === so need only subscribe, getSnapshot, getSeverSnapshot
    subscribe(handleNavigator: () => void) {
        window.addEventListener("online", handleNavigator)
        window.addEventListener("offline", handleNavigator)
        return () => {
            window.removeEventListener("online", handleNavigator)
            window.removeEventListener("offline", handleNavigator)
        }
    },
    getSnapshot() {
        return typeof window !== "undefined" ? navigator.onLine : true
    },
    getServerSnapshot() {
        return true
    }
}


export const OnlineComponent = () => {
    const snapshot = useSyncExternalStore(onlineStore.subscribe, onlineStore.getSnapshot, onlineStore.getServerSnapshot)

    return <div className="container">
        <p className="text-indigo-800 bg-black text-4xl text-bold">
            Connection Status is {snapshot ? "Online" : "Offline"}
        </p>
    </div>
}