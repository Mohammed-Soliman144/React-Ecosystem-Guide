import {forwardRef, useImperativeHandle, useRef} from "react"


export type refType = {
    focus: (inputType: string) => void,
    reset: (inputType: string) => void,
}


export type propsType = {
    children: React.ReactNode
}

export const ChildComponent = forwardRef<refType, propsType>(({children}, ref) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    useImperativeHandle(ref, () => ({
        focus: (inputType: string) => {
            switch(inputType) {
                case "name":
                    if(!nameRef.current) return
                    nameRef.current.focus()
                break;
                case "email" : 
                    if(!emailRef.current) return
                    emailRef.current.focus()
                break;
                case "password":
                    if(!passwordRef.current) return
                    passwordRef.current.focus()
                break;
            }
        },
        reset: (inputType: string) => {
            switch(inputType) {
                case "name":
                    if(!nameRef.current) return
                    nameRef.current.value = ""
                break;
                case "email":
                    if(!emailRef.current) return
                    emailRef.current.value = ""
                break;
                case "password":
                    if(!passwordRef.current) return
                    passwordRef.current.value = ""
                break;
                case "all":
                    if(!formRef.current) return
                    formRef.current.reset()
            }
        }
    }), [])

    return <form action="" method="GET" ref={formRef} noValidate>
        <label htmlFor="name">
            Name: 
        </label>
        <input type="text" id="name" ref={nameRef}/>
        <label htmlFor="email">
            Email: 
        </label>
        <input type="email" id="email" ref={emailRef}/>
        <label htmlFor="password">
            Password: 
        </label>
        <input type="password" id="password" ref={passwordRef}/>
        {children}
    </form>
}) 