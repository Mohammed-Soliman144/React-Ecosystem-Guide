type counterType = "INCREMENT" | "DECREMENT" | "RESET"

export const counterStore = {
    state: 0,
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
        this.notify()
    },
    subscribe(handlerClick: () => void) {
        this.listeners.add(handlerClick)
        return () => this.listeners.delete(handlerClick)
    },
    notify(){
        this.listeners.forEach(listener => listener())
    },
    getSnapshot() {
        return this.state
    },
    getServerSnapshot() {
        return 0
    }
}