import {useState, useEffect, useCallback} from "react"

export const MouseMove = () => {
    const [move, setMove] = useState({x: 0, y: 0})
    const [isMoving, setIsMoving] = useState(true)

    const handleMove = useCallback((e: MouseEvent) => {
        console.log("handleMove => function is rerendering again");
        setMove(prev => {
            return {
                ...prev,
                x: e.clientX,
                y: e.clientY
            }
        })
    }, [])


    const handleIsMoving = useCallback(() => {
        console.log("handleIsMoving => function is rerendering again");
        setIsMoving(prev => !prev)
    }, [])

    useEffect(() => {
        window.addEventListener("mousemove", handleMove)
        return () => {
            window.removeEventListener("mousemove", handleMove)
        }
    }, [handleMove])

    return <div className="container">
        {   isMoving &&
            <h2>Mouse Coordinate X: {move.x} - Mouse Coordinate Y: {move.y}</h2>
        }
        <button type="button" onClick={handleIsMoving}>{isMoving? "Stop Moving" : "Start Moving"}</button>
    </div>
}