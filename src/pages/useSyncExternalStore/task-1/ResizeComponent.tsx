import {useSyncExternalStore} from "react"

const resizeStore = {
    // resize event is sent to browser automatically when private property (readonly) innerWidth change === so no need state, setState, listeners (add, remove, call) only need subscribe, getSnapshot, getServerSnapshot
    subscribe(handleResize: () => void) {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    },
    getSnapshot() {
        return typeof window !== "undefined"? window.innerWidth : 1280
    },
    getServerSnapshot() {
        return 1280
    }
}

export const ResizeComponent = () => {
    const snapshot = useSyncExternalStore(resizeStore.subscribe, resizeStore.getSnapshot, resizeStore.getServerSnapshot)

    return <div className="container">
        <p className="text-indigo-800 bg-black text-4xl text-bold">
            inner width of window = {snapshot}px
        </p>
    </div>
}