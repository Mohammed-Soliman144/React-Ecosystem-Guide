import { useRef } from "react"
import { type refType, ChildComponent } from "./ChildComponent"

export const ParentComponent = () => {
    const childRef = useRef<refType>(null)
    return <div className="container">
        <ChildComponent ref={childRef}>
            <div className="buttons">
                <div className="form-controls">
                    <button type="button" onClick={() => childRef.current?.focus("name")}>Focus Name</button>
                    <button type="button" onClick={() => childRef.current?.reset("name")}>Reset Name</button>
                </div>
                <div className="form-controls">
                    <button type="button" onClick={() => childRef.current?.focus("email")}>Focus Email</button>
                    <button type="button" onClick={() => childRef.current?.reset("email")}>Reset Email</button>
                </div>
                <div className="form-controls">
                    <button type="button" onClick={() => childRef.current?.focus("password")}>Focus Password</button>
                    <button type="button" onClick={() => childRef.current?.reset("password")}>Reset Password</button>
                </div>
                <button type="button" onClick={() => childRef.current?.reset("all")}>Reset Form</button>
            </div>
        </ChildComponent>
    </div>
}