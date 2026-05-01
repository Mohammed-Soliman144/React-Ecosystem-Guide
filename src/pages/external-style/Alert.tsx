import  React from "react"
import "@/pages/external-style/Alert.css"
const Alert = ({children, type = "success"}: {children: React.ReactNode, type?: "success" | "error" }) => {
    return (
        <div className={`container alert ${type}`}>
            {children}
        </div>
    )
}

export {Alert}