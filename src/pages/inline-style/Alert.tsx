import  React from "react"
const Alert = ({children, type = "success"}: {children: React.ReactNode, type?: "success" | "error" }) => {
    return (
        <div className="container" style={{
            backgroundColor: type === "success" ? "#10b981" : "#ff4444",
            padding: "16px",
            marginBottom: "8px",
            color: type === "success" ? "#000" : "#fff",
            borderRadius: "8px"
        }}>
            {children}
        </div>
    )
}

export {Alert}