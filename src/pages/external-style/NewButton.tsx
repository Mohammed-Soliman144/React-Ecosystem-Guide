import React from "react"
export const NewButton = ({children}: {children: React.ReactNode}) => {
    return <button className="alert success">
        {children}
    </button>
}