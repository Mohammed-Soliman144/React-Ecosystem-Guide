import  React from "react"
import styles from "@/pages/module-style/Alert.module.css"

const Alert = ({children, type = "success-special"}: {children: React.ReactNode, type?: "success-special" | "error-special" }) => {
    return (
        <div className={`container ${styles[`alert-special`]} ${styles[type]}`}>
            {children}
        </div>
    )
}

export {Alert}