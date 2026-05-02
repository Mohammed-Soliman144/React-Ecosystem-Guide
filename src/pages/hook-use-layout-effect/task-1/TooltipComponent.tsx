import {useLayoutEffect, useRef, useState} from "react"

interface ToolTipPosition {
    top: number,
    left: number,
    isAbove: boolean
}

export const TooltipComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const targetRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState<ToolTipPosition>({
        top: 0,
        left: 0,
        isAbove: false
    })
    const [showTip, setShowTip] = useState(false)

    useLayoutEffect(() => {
        if(!showTip) return
        const handleUpdate = () => {
            if(!buttonRef.current || !targetRef.current) return
            const buttonRect = buttonRef.current.getBoundingClientRect()
            const targetRect = targetRef.current.getBoundingClientRect()

            const spaceAboveBtn = buttonRect.top
            const spaceBetweenBtnView = window.innerHeight - buttonRect.bottom 
            const isAbove = spaceAboveBtn > spaceBetweenBtnView

            const newPosition:ToolTipPosition = {
                top: isAbove ? buttonRect.top - targetRect.height - 10 : buttonRect.bottom + 10,
                left: buttonRect.left + (buttonRect.width / 2) - (targetRect.width / 2) - 10,
                isAbove
            }

            setPosition(newPosition)
        }

        // run handle update immediately at first mounting
        handleUpdate()

        // track handle update within window resize
        window.addEventListener("resize", handleUpdate)
        // track handle update within window scroll
        window.addEventListener("scroll", handleUpdate)

        // cleanup
        return () => {
            window.removeEventListener("resize", handleUpdate)
            window.removeEventListener("scroll", handleUpdate)
        }
    }, [showTip])

    return <div className="container bg-slate-900 p-6 rounded-xl h-40">
        <button type="button" onMouseEnter={() => setShowTip(true)} onMouseLeave={() => setShowTip(false)} className="bg-gray-800 text-white font-bold text-sm rounded-md p-2">Button Tooltip</button>
        <div className="tooltip bg-cyan-800 p-3 rounded-lg shadow-xl text-center m-1" style={{
            position: "relative",
            top: `${position.top}px`,
            left: `${position.left}px`,
            display: showTip ? "block" : "none",
            width: "fit-content",
            zIndex: 1000
        }}>
            <p className="text-lg text-white font-bold">This is Tooltip</p>
        </div>
    </div>
}